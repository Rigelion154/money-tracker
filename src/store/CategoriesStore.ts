import { makeAutoObservable } from 'mobx';

import type { ICategory, IStoreCategories } from './categories.types.ts';

import { dbClient } from '../db/dbClient.ts';

class CategoriesStore {
  categories: IStoreCategories | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setCategories(categories: IStoreCategories) {
    this.categories = categories;
  }

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
}

export const categoriesStore = new CategoriesStore();
