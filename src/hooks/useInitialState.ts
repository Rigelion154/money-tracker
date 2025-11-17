import { useEffect, useState } from 'react';
import { subcategoriesStore } from '../store/SubcategoriesStore.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

export const useInitialState = (isAuth: boolean) => {
  const { v2_categories } = categoriesStore;
  const { subcategories } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!v2_categories && isAuth) {
      categoriesStore.getV2Categories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [v2_categories, isAuth]);

  useEffect(() => {
    if (!subcategories && isAuth) {
      subcategoriesStore.getV2Subcategories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [subcategories, isAuth]);

  return { isLoading };
};
