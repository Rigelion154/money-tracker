import { makeAutoObservable } from 'mobx';
import type {
  ICategory,
  IExpense,
  IStoreCategories,
  IStoreExpense,
} from './categories.types.ts';
import { dbClient } from '../db/dbClient.ts';

class CategoriesStore {
  categories: IStoreCategories | null = null;
  expenses: Record<ICategory['id'], IStoreExpense> | null = null;
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  private setCategories(categories: IStoreCategories) {
    this.categories = categories;
  }

  getCategories = async (userId: string) => {
    // const { data, error } = await dbClient
    //   .from('categories')
    //   .select()
    //   .or(`user_id.eq.${userId},is_default.eq.true`);

    const { data, error } = await dbClient.rpc('get_user_categories', {
      user_uuid: userId,
    });

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

  private setExpenses = (expenses: Record<ICategory['id'], IStoreExpense>) => {
    this.expenses = expenses;
  };

  getUserExpenses = async (userId: string) => {
    const { data } = await dbClient
      .from('expenses')
      .select(`*,categories (title, color, icon), subcategories (id, title)`)
      .eq('user_id', userId)
      .order('amount', { ascending: false });

    if (data && data.length > 0) {
      const expensesMap = (data as IExpense[]).reduce(
        (acc, current) => {
          if (!acc[current.category_id]) {
            acc[current.category_id] = {
              category: current.categories,
              subcategories: {},
              totalAmount: 0,
              items: [],
            };
          }
          // Добавляем подкатегорию если она есть
          if (current.subcategory_id && current.subcategories) {
            if (!acc[current.category_id].subcategories) {
              acc[current.category_id].subcategories = {};
            }

            if (
              !acc[current.category_id].subcategories[current.subcategory_id]
            ) {
              acc[current.category_id].subcategories[current.subcategory_id] =
                current.subcategories;
            }
          }
          // Обновляем сумму и добавляем запись
          acc[current.category_id].totalAmount += current.amount;
          acc[current.category_id].items.push(current);

          return acc;
        },
        {} as Record<ICategory['id'], IStoreExpense>,
      );

      this.setExpenses(expensesMap);
    }
  };
}

export const categoriesStore = new CategoriesStore();
