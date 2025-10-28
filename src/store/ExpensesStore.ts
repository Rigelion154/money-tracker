import { makeAutoObservable, toJS } from 'mobx';

import type {
  ICategory,
  IExpense,
  IExpenseCategory,
  ISubcategory,
} from '../types/expenses.types.ts';

import { dbClient } from '../db/dbClient.ts';
import { appToaster } from './AppToaster.ts';
import { getExpensesRequest } from '../api/requests/getExpensesRequest.ts';
import { groupExpensesByDate } from '../utils/groupExpensesByDate.ts';

class ExpensesStore {
  expenses: IExpenseCategory[] = [];
  totalAmount: number = 0;
  activePeriod: 'day' | 'month' | 'year' | null = null;
  v2expenses: {
    totalAmount: number;
    categoryId: string;
    expenses: Record<string, IExpense[]>;
    subcategories?: {
      subcategoryId: string;
      totalAmount: number;
      expenses: IExpense[];
    }[];
  }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getV2Expenses = async () => {
    const { data } = await getExpensesRequest(this.activePeriod);

    if (data) {
      const categories: Record<
        ICategory['id'],
        {
          totalAmount: number;
          categoryId: string;
          expenses: IExpense[];
          subcategories: Record<
            ISubcategory['id'],
            {
              subcategoryId: string;
              totalAmount: number;
              expenses: IExpense[];
            }
          >;
        }
      > = {};

      for (const expense of data as IExpense[]) {
        if (!categories[expense.category_id]) {
          categories[expense.category_id] = {
            totalAmount: 0,
            categoryId: expense.category_id,
            expenses: [],
            subcategories: {},
          };
        }

        if (
          categories[expense.category_id] &&
          expense.subcategory_id &&
          !categories[expense.category_id].subcategories[expense.subcategory_id]
        ) {
          categories[expense.category_id].subcategories[expense.subcategory_id] = {
            totalAmount: 0,
            subcategoryId: expense.subcategory_id,
            expenses: [],
          };

          categories[expense.category_id].subcategories[expense.subcategory_id].totalAmount +=
            expense.amount;
          categories[expense.category_id].subcategories[expense.subcategory_id].expenses.push(
            expense,
          );
        }

        categories[expense.category_id].totalAmount += expense.amount;
        categories[expense.category_id].expenses.push(expense);
      }

      console.log('categories', categories);

      // @ts-ignore
      this.v2expenses = Object.values(categories)
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .map((category) => ({
          ...category,
          expenses: groupExpensesByDate(category.expenses),
          ...(category.subcategories && {
            subcategories: Object.values(category.subcategories).sort(
              (a, b) => b.totalAmount - a.totalAmount,
            ),
          }),
        }));
    }

    console.log('v2expenses', toJS(this.v2expenses));
  };

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
