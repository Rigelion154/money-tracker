import { makeAutoObservable } from 'mobx';

import type { ICategory, ISubcategory } from '../types/expenses.types.ts';

import { getSubcategoriesRequest } from '../api/requests/getSubcategoriesRequest.ts';
import { upsertSubcategoryRequest } from '../api/requests/subcategory/upsertSubcategoryRequest.ts';
import { deleteSubcategoryRequest } from '../api/requests/subcategory/deleteSubcategoryRequest.ts';
import { checkSubcategoryExist } from '../api/requests/subcategory/checkSubcategoryExist.ts';
import { appToaster } from './AppToaster.ts';

class SubcategoriesStore {
  subcategoriesById: Record<ISubcategory['id'], ISubcategory> | null = null;
  subcategoriesByCategoryId: Record<ICategory['id'], ISubcategory[]> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getSubcategories = async () => {
    const { data, error } = await getSubcategoriesRequest();

    if (error) return appToaster.addToast('Ошибка загрузки подкатегорий', 'error');

    if (data) {
      const { subGroupedById, subGroupedByCategoryId } = this.getFormattedSubcategories(data);

      this.setSubcategoriesById(subGroupedById);
      this.setSubcategoriesByCategoryId(subGroupedByCategoryId);
    }
  };

  isSubcategoryExist = async (categoryId: string, title: string, subcategoryId?: string) => {
    const { data } = await checkSubcategoryExist(categoryId, title, subcategoryId);
    return !!data?.length;
  };

  upsertSubcategory = async (categoryId: string, title: string, subcategoryId?: string) => {
    const { data, error } = await upsertSubcategoryRequest(categoryId, title, subcategoryId);
    const message = `Подкатегория успешно ${subcategoryId ? 'изменена' : 'создана'}`;

    if (data) appToaster.addToast(message, 'success');
    if (error) appToaster.addToast('Ошибка создания подкатегории', 'error');

    return { data, error };
  };

  deleteSubcategory = async (subcategoryId?: string) => {
    const { data, error } = await deleteSubcategoryRequest(subcategoryId);

    if (data) appToaster.addToast('Подкатегория удалена', 'success');
    if (error) appToaster.addToast('Ошибка удаления подкатегории', 'error');

    return { data, error };
  };

  private setSubcategoriesById = (subcategories: Record<ISubcategory['id'], ISubcategory>) =>
    (this.subcategoriesById = subcategories);

  private setSubcategoriesByCategoryId = (data: Record<ICategory['id'], ISubcategory[]> | null) =>
    (this.subcategoriesByCategoryId = data);

  private getFormattedSubcategories = (data: ISubcategory[]) => {
    const subGroupedById: Record<ISubcategory['id'], ISubcategory> = {};
    const subGroupedByCategoryId: Record<ICategory['id'], ISubcategory[]> = {};

    for (const subcategory of data as ISubcategory[]) {
      if (!subGroupedById[subcategory.id]) {
        subGroupedById[subcategory.id] = subcategory;
      }

      if (!subGroupedByCategoryId[subcategory.category_id]) {
        subGroupedByCategoryId[subcategory.category_id] = [];
      }

      subGroupedByCategoryId[subcategory.category_id].push(subcategory);
    }

    return { subGroupedById, subGroupedByCategoryId };
  };
}

export const subcategoriesStore = new SubcategoriesStore();
