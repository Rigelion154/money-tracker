import { useEffect, useState } from 'react';
import { subcategoriesStore } from '../store/SubcategoriesStore.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

export const useInitialState = (isAuth: boolean) => {
  const { v2_categories } = categoriesStore;
  const { subcategoriesById } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!v2_categories && isAuth) {
      categoriesStore.getV2Categories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [v2_categories, isAuth]);

  useEffect(() => {
    if (!subcategoriesById && isAuth) {
      subcategoriesStore.getSubcategories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [subcategoriesById, isAuth]);

  return { isLoading };
};
