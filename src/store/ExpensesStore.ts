import moment from 'moment';
import { makeAutoObservable } from 'mobx';

import type {
  IExpense,
  IExpenseCategory,
  IV2Expense,
  TActivePeriod,
  TExpensesMap,
} from '../types/expenses.types.ts';

import { dbClient } from '../db/dbClient.ts';

import { getExpensesRequest } from '../api/requests/getExpensesRequest.ts';
import { groupExpensesByDate } from '../utils/groupExpensesByDate.ts';
import { calculatePercentage } from '../utils/calculatePersentage.ts';
import { REQUEST_DATE_FORMAT } from '../utils/constants.ts';
import { authStore } from './AuthStore.ts';
import { appToaster } from './AppToaster.ts';

class ExpensesStore {
  expenses: IExpenseCategory[] = [];
  totalAmount: number = 0;
  activePeriod: TActivePeriod = null;
  v2expenses: IV2Expense[] = [];
  formDate: Date | null = null;
  periodDate: Date | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFormDate = (value: Date | null) => (this.formDate = value);
  setPeriodDate = (value: Date | null) => (this.periodDate = value);

  private setV2Expenses = (expenses: IV2Expense[]) => (this.v2expenses = expenses);

  getV2Expenses = async () => {
    const { data } = await getExpensesRequest(this.activePeriod, this.periodDate);

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

  private setTotalAmount = (amount: number) => (this.totalAmount += amount);
  private resetTotalAmount = () => (this.totalAmount = 0);

  setActivePeriod = (activePeriod: TActivePeriod) => (this.activePeriod = activePeriod);

  addExpense = async (categoryId: string, amount: string, subcategoryId?: string, date?: Date) => {
    const { data, error } = await dbClient
      .from('expenses')
      .upsert({
        user_id: authStore.userId,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        amount: parseFloat(amount.replace(',', '.')),
        date: moment(date).format(REQUEST_DATE_FORMAT),
      })
      .select();

    if (error) appToaster.addToast('Ошибка добавления суммы', 'error');

    if (data) appToaster.addToast('Сумма успешно добавлена', 'success');
  };

  deleteExpenseById = async (expenseId: string) =>
    await dbClient.from('expenses').delete().eq('id', expenseId).select();
}

export const expensesStore = new ExpensesStore();
