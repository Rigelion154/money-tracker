import { useEffect, useState } from 'react';
import { expensesStore } from '../store/ExpensesStore.ts';
import { subcategoriesStore } from '../store/SubcategoriesStore.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

export const useInitialState = (isAuth: boolean) => {
  const { activePeriod, periodDate } = expensesStore;
  const { v2_categories } = categoriesStore;
  const { subcategories } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!v2_categories && isAuth) {
      categoriesStore.getV2Categories().finally(() => setIsLoading(false));
    }
  }, [v2_categories, isAuth]);

  useEffect(() => {
    if (!subcategories && isAuth) {
      subcategoriesStore.getV2Subcategories().finally(() => setIsLoading(false));
    }
  }, [subcategories, isAuth]);

  useEffect(() => {
    if (isAuth) {
      if (!isLoading) setIsLoading(true);

      expensesStore.getV2Expenses().finally(() => setIsLoading(false));
    }
  }, [activePeriod, periodDate, isAuth]);

  return { isLoading };
};
