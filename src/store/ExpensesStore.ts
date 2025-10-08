import { makeAutoObservable } from 'mobx';

import type { IExpenseCategory } from '../types/expenses.types.ts';

import { dbClient } from '../db/dbClient.ts';
import { appToaster } from './AppToaster.ts';

class ExpensesStore {
  expenses: IExpenseCategory[] = [];
  totalAmount: number = 0;
  activePeriod: 'day' | 'month' | 'year' | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setExpenses = (expenses: IExpenseCategory[]) => (this.expenses = expenses);
  private setTotalAmount = (totalAmount: number) => (this.totalAmount = totalAmount);

  setActivePeriod = (activePeriod: 'day' | 'month' | 'year') => (this.activePeriod = activePeriod);

  getUserExpenses = async (userId: string, startDate?: string | null, endDate?: string | null) => {
    const { data, error } = await dbClient.rpc('get_category_expenses', {
      user_uuid: userId,
      start_date: startDate,
      end_date: endDate,
    });

    if (data) {
      this.setExpenses(data);
      const totalAmount = (data as IExpenseCategory[]).reduce(
        (acc, current) => acc + current.category_total_amount,
        0,
      );

      this.setTotalAmount(totalAmount);
    }

    if (error) appToaster.addToast('Ошибка загрузки расходов', 'error');
  };

  addExpense = async (
    userId: string | null,
    categoryId: string,
    amount: string,
    subcategoryId?: string,
    date?: string,
  ) =>
    dbClient
      .from('expenses')
      .upsert({
        category_id: categoryId,
        subcategory_id: subcategoryId,
        amount: parseFloat(amount.replace(',', '.')),
        user_id: userId,
        date: date ?? undefined,
      })
      .select();

  getExpenseById = async (expenseId: string) =>
    await dbClient
      .from('expenses')
      .select(`*,categories (*), subcategories (*)`)
      .eq('id', expenseId);

  deleteExpenseById = async (expenseId: string) =>
    await dbClient.from('expenses').delete().eq('id', expenseId).select();
}

export const expensesStore = new ExpensesStore();
