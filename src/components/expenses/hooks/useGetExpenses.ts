import { useEffect, useState } from 'react';
import { expensesStore } from '../../../store/ExpensesStore.ts';
import { authStore } from '../../../store/AuthStore.ts';

export const useGetExpenses = () => {
  const { periodDate, activePeriod } = expensesStore;
  const { isAuth } = authStore;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isAuth) {
      if (!isLoading) setIsLoading(true);
      expensesStore.getV2Expenses().finally(() => setIsLoading(false));
    }
  }, [activePeriod, periodDate, isAuth]);

  return { isLoading };
};
