import { authStore } from '../store/AuthStore.ts';
import { useEffect, useState } from 'react';
import type { IExpense, ISubcategory } from '../types/expenses.types.ts';
import { dbClient } from '../db/dbClient.ts';
import { appToaster } from '../store/AppToaster.ts';

export const useSubcategoryDetails = (subcategoryId: string) => {
  const { userId } = authStore;
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subcategory, setSubcategory] = useState<ISubcategory | null>(null);

  useEffect(() => {
    dbClient
      .from('subcategories')
      .select()
      .eq('id', subcategoryId)
      .then(({ data }) => {
        if (data) {
          const [subcategory] = data as ISubcategory[];
          setSubcategory(subcategory);
        }
      });

    dbClient
      .rpc('get_subcategory_expenses', { id_user: userId, id_subcategory: subcategoryId })
      .then(({ data, error }) => {
        if (error) return appToaster.addToast('Ошибка загрузки данных', 'error');

        if (data) {
          setExpenses(data);
        }

        setIsLoading(false);
      });
  }, []);

  return { expenses, isLoading, subcategory };
};
