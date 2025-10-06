import { makeAutoObservable } from 'mobx';
import { dbClient } from '../db/dbClient.ts';
import type { ICategory, IExpense } from './categories.types.ts';

interface IExpenseStoreData {
  totalAmount: number;
  category: Partial<ICategory>;
  expenses: IExpense[];
}

class ExpensesStore {
  expenseList: IExpenseStoreData[] = [];
  totalAmount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  private setExpenseList = (data: IExpenseStoreData[]) => (this.expenseList = data);

  private setTotalAmount = (current: number) => (this.totalAmount += current);

  getUserExpenses = async (userId: string) => {
    const { data } = await dbClient
      .from('expenses')
      .select(`*,categories (id, title, color, icon), subcategories (id, title)`)
      .eq('user_id', userId)
      .order('amount', { ascending: false });

    if (data) {
      const tempMap: Record<string, IExpenseStoreData> = {};

      for (const expense of data as IExpense[]) {
        if (!tempMap[expense.category_id]) {
          tempMap[expense.category_id] = {
            category: expense.categories,
            totalAmount: 0,
            expenses: [],
          };
        }
        tempMap[expense.category_id].totalAmount += expense.amount;
        tempMap[expense.category_id].expenses.push(expense);
        this.setTotalAmount(expense.amount);
      }
      // Преобразуем в массив и сразу сортируем
      const categoryTotals = Object.entries(tempMap)
        .map(([_, item]) => ({ ...item }))
        .sort((a, b) => b.totalAmount - a.totalAmount);

      this.setExpenseList(categoryTotals);
    }
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
      .select(`*,categories (id, title, color, icon), subcategories (id, title)`)
      .eq('id', expenseId);

  deleteExpenseById = async (expenseId: string) => {
    this.expenseList = this.expenseList.filter((expense) =>
      expense.expenses.filter((expense) => expense.id !== expenseId),
    );
    return dbClient.from('expenses').delete().eq('id', expenseId).select();
  };
}

export const expensesStore = new ExpensesStore();
