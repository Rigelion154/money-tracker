import { useEffect, useState } from 'react';
import { subcategoriesStore } from '../store/SubcategoriesStore.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

export const useInitialState = (isAuth: boolean) => {
  const { categories } = categoriesStore;
  const { subcategoriesById } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categories && isAuth) {
      categoriesStore.getCategories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [categories, isAuth]);

  useEffect(() => {
    if (!subcategoriesById && isAuth) {
      subcategoriesStore.getSubcategories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [subcategoriesById, isAuth]);

  return { isLoading };
};
