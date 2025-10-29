import { makeAutoObservable } from 'mobx';

import type {
  IExpense,
  IExpenseCategory,
  IV2Expense,
  TActivePeriod,
  TExpensesMap,
} from '../types/expenses.types.ts';

import { dbClient } from '../db/dbClient.ts';
import { appToaster } from './AppToaster.ts';
import { getExpensesRequest } from '../api/requests/getExpensesRequest.ts';
import { groupExpensesByDate } from '../utils/groupExpensesByDate.ts';
import { calculatePercentage } from '../utils/calculatePersentage.ts';
import moment from 'moment';
import { authStore } from './AuthStore.ts';

class ExpensesStore {
  expenses: IExpenseCategory[] = [];
  totalAmount: number = 0;
  activePeriod: TActivePeriod = null;
  v2expenses: IV2Expense[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setV2Expenses = (expenses: IV2Expense[]) => (this.v2expenses = expenses);

  getV2Expenses = async () => {
    const { data } = await getExpensesRequest(this.activePeriod);

    this.resetTotalAmount();

    if (data) {
      const expensesMap: TExpensesMap = {};

      for (const expense of data as IExpense[]) {
        const catId = expense.category_id;
        const subId = expense.subcategory_id;

        if (!expensesMap[catId]) {
          expensesMap[catId] = {
            totalAmount: 0,
            categoryId: catId,
            expenses: [],
            subcategories: {},
          };
        }

        if (expensesMap[catId] && subId && !expensesMap[catId].subcategories[subId]) {
          expensesMap[catId].subcategories[subId] = {
            totalAmount: 0,
            subcategoryId: subId,
            expenses: [],
          };
        }

        if (subId) {
          expensesMap[catId].subcategories[subId].totalAmount += expense.amount;
          expensesMap[catId].subcategories[subId].expenses.push(expense);
        }

        expensesMap[catId].totalAmount += expense.amount;
        expensesMap[catId].expenses.push(expense);

        this.setTotalAmount(expense.amount);
      }

      const resultExpenses = Object.values(expensesMap)
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .map((category) => ({
          ...category,
          percentage: calculatePercentage(this.totalAmount, category.totalAmount),
          expenses: groupExpensesByDate(category.expenses),
          subcategories: Object.values(category.subcategories)
            .sort((a, b) => b.totalAmount - a.totalAmount)
            .map((subcategory) => ({
              ...subcategory,
              percentage: calculatePercentage(category.totalAmount, subcategory.totalAmount),
              expenses: groupExpensesByDate(subcategory.expenses),
            })),
        }));

      this.setV2Expenses(resultExpenses);
    }
  };

  private setExpenses = (expenses: IExpenseCategory[]) => (this.expenses = expenses);
  private setTotalAmount = (amount: number) => (this.totalAmount += amount);
  private resetTotalAmount = () => (this.totalAmount = 0);

  setActivePeriod = (activePeriod: TActivePeriod) => (this.activePeriod = activePeriod);

  getUserExpenses = async (startDate?: string | null, endDate?: string | null) => {
    const { data, error } = await dbClient.rpc('get_category_expenses', {
      user_uuid: authStore.userId,
      start_date: startDate,
      end_date: endDate,
    });

    if (data) {
      this.setExpenses(data);
      // const totalAmount = (data as IExpenseCategory[]).reduce(
      //   (acc, current) => acc + current.category_total_amount,
      //   0,
      // );

      // this.setTotalAmount(totalAmount);
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
        date: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
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
