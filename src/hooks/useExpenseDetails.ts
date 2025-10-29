import { useState } from 'react';
import { expensesStore } from '../store/ExpensesStore.ts';
import { appToaster } from '../store/AppToaster.ts';
import { modalStore } from '../store/ModalStore.ts';

export const useExpenseDetails = () => {
  // const [expense, setExpense] = useState<IExpenseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   expensesStore
  //     .getExpenseById(id)
  //     .then(({ data, error }) => {
  //       if (error) return appToaster.addToast('Ошибка загрузки транзакции', 'error');
  //       if (data) setExpense(data[0]);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  const handleDeleteExpense = async (id: string) => {
    setIsLoading(true);
    const { data, error } = await expensesStore.deleteExpenseById(id);
    if (data) {
      appToaster.addToast('Транзакция успешно удалена', 'success');
      // await expensesStore.getUserExpenses(userId ?? '');
      await expensesStore.getV2Expenses();
      modalStore.resetModalList();
    }
    if (error) appToaster.addToast('Ошибка удаления транзакции', 'error');

    setIsLoading(false);
  };

  return { handleDeleteExpense, isLoading };
};