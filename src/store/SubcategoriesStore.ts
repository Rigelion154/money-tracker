import { makeAutoObservable } from 'mobx';

import type { ISubcategory } from '../types/expenses.types.ts';

import { dbClient } from '../db/dbClient.ts';

class SubcategoriesStore {
  currentSubcategoryList: ISubcategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setCurrentSubcategoryList = (data: ISubcategory[]) =>
    (this.currentSubcategoryList = data);
  private upsertSubcategoryToStore = (data: ISubcategory, subcategoryId?: string) => {
    if (!subcategoryId) {
      this.currentSubcategoryList.push(data);
    }

    if (subcategoryId) {
      const index = this.currentSubcategoryList.findIndex(
        (subcategory) => subcategory.id === data.id,
      );
      if (index !== -1) {
        this.currentSubcategoryList[index] = data;
      }
    }
  };

  private deleteSubcategoryFromStore = (subcategoryId?: string) =>
    (this.currentSubcategoryList = this.currentSubcategoryList.filter(
      (subcategory) => subcategory.id !== subcategoryId,
    ));

  resetCurrentSubcategoryList = () => (this.currentSubcategoryList = []);

  getSubcategories = async (userId: string, categoryId: string) => {
    const { data } = await dbClient
      .from('subcategories')
      .select()
      .eq('user_id', userId)
      .eq('category_id', categoryId);

    if (data) {
      this.setCurrentSubcategoryList(data);
    }
  };

  isSubcategoryExist = async (
    userId: string | null,
    categoryId: string,
    title: string,
    subcategoryId?: string,
  ) => {
    let query = dbClient
      .from('subcategories')
      .select()
      .eq('user_id', userId)
      .eq('category_id', categoryId);

    if (!subcategoryId) {
      query = query.ilike('title', title.trim().toLowerCase());
    } else {
      query = query.eq('title', title.trim()).neq('id', subcategoryId);
    }

    const { data } = await query;

    return !!data?.length;
  };

  upsertSubcategory = async (
    userId: string | null,
    categoryId: string,
    title: string,
    subcategoryId?: string,
  ) => {
    const { data, error } = await dbClient
      .from('subcategories')
      .upsert({
        id: subcategoryId,
        category_id: categoryId,
        user_id: userId,
        title: title.trim(),
      })
      .select();

    if (data) {
      const [newSubcategory] = data;
      this.upsertSubcategoryToStore(newSubcategory as ISubcategory, subcategoryId);
    }

    return { data, error };
  };

  deleteSubcategory = async (subcategoryId?: string) => {
    const { data, error } = await dbClient
      .from('subcategories')
      .delete()
      .eq('id', subcategoryId)
      .select();
    if (data) {
      this.deleteSubcategoryFromStore(subcategoryId);
    }

    return { data, error };
  };
}

export const subcategoriesStore = new SubcategoriesStore();
