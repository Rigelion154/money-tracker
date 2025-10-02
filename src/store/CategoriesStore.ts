import { makeAutoObservable } from 'mobx';
import type { ICategory, IExpense, IStoreCategories, IStoreExpense } from './categories.types.ts';
import { dbClient } from '../db/dbClient.ts';

interface ITotalAmountCategory {
  totalAmount: number;
  category: Partial<ICategory>;
  expenses: IExpense[];
}

class CategoriesStore {
  categories: IStoreCategories | null = null;
  expenses: Record<ICategory['id'], IStoreExpense> | null = null;
  totalAmountCategoryList: ITotalAmountCategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setCategories(categories: IStoreCategories) {
    this.categories = categories;
  }

  private setTotalAmountCategoryList = (data: ITotalAmountCategory[]) =>
    (this.totalAmountCategoryList = data);

  getCategories = async (userId: string) => {
    const { data, error } = await dbClient
      .from('categories')
      .select()
      .or(`user_id.eq.${userId},is_default.eq.true`);

    if (error) {
      return error;
    }

    if (data) {
      const categoriesMap = (data as ICategory[]).reduce(
        (acc, current) => {
          if (!acc.data[current.id]) {
            acc.data[current.id] = current;
            acc.order.push(current.id);
          }

          return acc;
        },
        { data: {}, order: [] } as IStoreCategories,
      );

      this.setCategories(categoriesMap);
    }
  };

  addExpense = async (
    userId: string | null,
    categoryId: string,
    amount: string,
    subcategoryId?: string,
  ) => {
    return dbClient
      .from('expenses')
      .upsert({
        category_id: categoryId,
        subcategory_id: subcategoryId,
        amount: parseFloat(amount.replace(',', '.')),
        user_id: userId,
      })
      .select();
  };

  getUserExpenses = async (userId: string) => {
    const { data } = await dbClient
      .from('expenses')
      .select(`*,categories (id, title, color, icon), subcategories (id, title)`)
      .eq('user_id', userId)
      .order('amount', { ascending: false });

    if (data) {
      const tempMap: Record<string, ITotalAmountCategory> = {};

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
      }
      // Преобразуем в массив и сразу сортируем
      const categoryTotals = Object.entries(tempMap)
        .map(([_, item]) => ({ ...item }))
        .sort((a, b) => b.totalAmount - a.totalAmount);

      this.setTotalAmountCategoryList(categoryTotals);
    }

    // console.log('expenses sorted:', toJS(this.totalAmountCategoryList));

    // if (data && data.length > 0) {
    //   const expensesMap = (data as IExpense[]).reduce(
    //     (acc, current) => {
    //       if (!acc[current.category_id]) {
    //         acc[current.category_id] = {
    //           category: current.categories,
    //           subcategories: {},
    //           totalAmount: 0,
    //           items: [],
    //         };
    //       }
    //       // Добавляем подкатегорию если она есть
    //       if (current.subcategory_id && current.subcategories) {
    //         if (!acc[current.category_id].subcategories) {
    //           acc[current.category_id].subcategories = {};
    //         }
    //
    //         if (
    //           !acc[current.category_id].subcategories[current.subcategory_id]
    //         ) {
    //           acc[current.category_id].subcategories[current.subcategory_id] =
    //             current.subcategories;
    //         }
    //       }
    //       // Обновляем сумму и добавляем запись
    //       acc[current.category_id].totalAmount += current.amount;
    //       acc[current.category_id].items.push(current);
    //
    //       return acc;
    //     },
    //     {} as Record<ICategory['id'], IStoreExpense>,
    //   );
    //
    //   this.setExpenses(expensesMap);
    // }
  };
}

export const categoriesStore = new CategoriesStore();
