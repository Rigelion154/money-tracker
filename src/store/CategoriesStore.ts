import { makeAutoObservable } from 'mobx';

import type { ICategoryOld, IStoreCategories } from './categories.types.ts';

import { dbClient } from '../db/dbClient.ts';

class CategoriesStore {
  categories: IStoreCategories | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setCategories(categories: IStoreCategories) {
    this.categories = categories;
  }

  getCategories = async (userId: string | null) => {
    const { data, error } = await dbClient
      .from('categories')
      .select()
      .or(`user_id.eq.${userId},is_default.eq.true`);

    if (error) {
      return error;
    }

    if (data) {
      const categoriesMap = (data as ICategoryOld[]).reduce(
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

  isCategoryExist = async (userId: string | null, title: string, categoryId?: string) => {
    let query = dbClient.from('categories').select().eq('user_id', userId);

    if (!categoryId) {
      query = query.ilike('title', title.trim().toLowerCase());
    } else {
      query = query.eq('title', title.trim()).neq('id', categoryId);
    }

    const { data } = await query;

    return !!data?.length;
  };

  upsertCategory = async (
    userId: string | null,
    title: string,
    color: string,
    icon: string,
    categoryId?: string,
  ) =>
    await dbClient
      .from('categories')
      .upsert({
        id: categoryId,
        user_id: userId,
        title: title.trim(),
        color: color.trim(),
        icon: icon,
      })
      .select();

  deleteCategory = async (categoryId?: string) =>
    await dbClient.from('categories').delete().eq('id', categoryId).select();
}

export const categoriesStore = new CategoriesStore();
