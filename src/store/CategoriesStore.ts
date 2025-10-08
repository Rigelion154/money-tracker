import { makeAutoObservable } from 'mobx';

import { dbClient } from '../db/dbClient.ts';
import type { ICategory } from '../types/expenses.types.ts';

class CategoriesStore {
  categories: Record<ICategory['id'], ICategory> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setCategories(categories: ICategory[]) {
    this.categories = categories.reduce(
      (acc, current) => {
        if (!acc[current.id]) acc[current.id] = current;
        return acc;
      },
      {} as Record<ICategory['id'], ICategory>,
    );
  }

  getCategories = async (userId: string | null) => {
    const { data } = await dbClient
      .from('categories')
      .select()
      .or(`user_id.eq.${userId},is_default.eq.true`);

    if (data) this.setCategories(data);
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
