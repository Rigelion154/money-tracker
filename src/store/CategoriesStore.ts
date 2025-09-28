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

  getCategories = async () => {
    const { data, error } = await dbClient.from('categories').select();

    if (error) {
      return error;
    }

    if (data) {
      const categoriesMap = (data as ICategory[]).reduce(
        (acc, current) => {
          if (!acc.data[current.uid]) {
            acc.data[current.uid] = current;
            acc.order.push(current.uid);
          }

          return acc;
        },
        { data: {}, order: [] } as IStoreCategories,
      );

      console.log(categoriesMap);

      this.setCategories(categoriesMap);
    }
  };
}

export const categoriesStore = new CategoriesStore();
