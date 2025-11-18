import { makeAutoObservable } from 'mobx';

import type { ICategory } from '../types/expenses.types.ts';

import { getCategoriesRequest } from '../api/requests/category/getCategoriesRequest.ts';
import { checkCategoryExistRequest } from '../api/requests/category/checkCategoryExistRequest.ts';
import { upsertCategoryRequest } from '../api/requests/category/upsertCategoryRequest.ts';
import { deleteCategoryRequest } from '../api/requests/category/deleteCategoryRequest.ts';
import { getDataMap } from '../utils/getDataMap.ts';
import { appToaster } from './AppToaster.ts';

class CategoriesStore {
  categories: Record<ICategory['id'], ICategory> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCategories = async () => {
    const { data, error } = await getCategoriesRequest();

    if (error) return appToaster.addToast('Ошибка загрузки категорий', 'error');
    if (data) this.setCategories(data);
  };

  resetCategories = () => (this.categories = null);

  isCategoryExist = async (title: string, categoryId?: string) => {
    const { data } = await checkCategoryExistRequest(title, categoryId);
    return !!data?.length;
  };

  upsertCategory = async (title: string, color: string, icon: string, categoryId?: string) => {
    const { data, error } = await upsertCategoryRequest(title, color, icon, categoryId);
    const message = `Категория успешно ${categoryId ? 'изменена' : 'создана'}`;

    if (error) appToaster.addToast('Ошибка создания категории', 'error');
    if (data) appToaster.addToast(message, 'success');

    return { data, error };
  };

  deleteCategory = async (categoryId?: string) => {
    const { data, error } = await deleteCategoryRequest(categoryId);

    if (error) appToaster.addToast('Ошибка удаления категории', 'error');
    if (data) appToaster.addToast('Категория удалена', 'success');

    return { data, error };
  };

  private setCategories = (categories: ICategory[]) =>
    (this.categories = getDataMap(categories, 'id'));
}

export const categoriesStore = new CategoriesStore();
