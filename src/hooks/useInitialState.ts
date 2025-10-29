import { useEffect, useState } from 'react';
import { expensesStore } from '../store/ExpensesStore.ts';
import { subcategoriesStore } from '../store/SubcategoriesStore.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

export const useInitialState = () => {
  const { activePeriod } = expensesStore;
  const { v2_categories } = categoriesStore;
  const { subcategories } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!v2_categories) {
      categoriesStore.getV2Categories().finally(() => setIsLoading(false));
    }
  }, [v2_categories]);

  useEffect(() => {
    if (!subcategories) {
      subcategoriesStore.getV2Subcategories().finally(() => setIsLoading(false));
    }
  }, [subcategories]);

  useEffect(() => {
    if (!isLoading) setIsLoading(true);

    expensesStore.getV2Expenses().finally(() => setIsLoading(false));
  }, [activePeriod]);

  return { isLoading };
};
