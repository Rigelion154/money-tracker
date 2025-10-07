import { makeAutoObservable } from 'mobx';

import type { IExpenseCategory } from '../types/expenses.types.ts';

import { dbClient } from '../db/dbClient.ts';
import { appToaster } from './AppToaster.ts';

class ExpensesStore {
  expenses: IExpenseCategory[] = [];
  totalAmount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  private setExpenses = (expenses: IExpenseCategory[]) => (this.expenses = expenses);
  private setTotalAmount = (totalAmount: number) => (this.totalAmount = totalAmount);

  getUserExpenses = async (userId: string) => {
    const { data, error } = await dbClient.rpc('get_categories_with_totals', {
      user_uuid: userId,
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
  ) =>
    dbClient
      .from('expenses')
      .upsert({
        category_id: categoryId,
        subcategory_id: subcategoryId,
        amount: parseFloat(amount.replace(',', '.')),
        user_id: userId,
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
