import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import type { IExpense } from '../../store/categories.types.ts';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { appToaster } from '../../store/AppToaster.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../helpers/BaseLoader.tsx';
import CloseModalButton from '../ui/CloseModalButton.tsx';

const ExpenseDetailsModal = observer(({ id }: { id: string }) => {
  const { userId } = authStore;
  const [expense, setExpense] = useState<IExpense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    expensesStore
      .getExpenseById(id)
      .then(({ data, error }) => {
        if (error) return appToaster.addToast('Ошибка загрузки транзакции', 'error');
        if (data) setExpense(data[0]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteExpense = async (id: string) => {
    setIsLoading(true);
    const { data, error } = await expensesStore.deleteExpenseById(id);
    if (data) {
      appToaster.addToast('Транзакция успешно удалена', 'success');
      await expensesStore.getUserExpenses(userId ?? '');
      modalStore.closeModal();
    }
    if (error) appToaster.addToast('Ошибка удаления транзакции', 'error');

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <BaseLoader variant="light" />}
      {!isLoading && expense && (
        <div className="modal__content expense__details_modal d-flex flex-column gap-2">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="text-muted mb-0">Сумма</h6>
            <CloseModalButton />
          </div>
          <span>{expense.amount}</span>

          <h6 className="text-muted mb-0">Дата</h6>
          <span>{moment(expense.date).format('DD.MM.YYYY HH:mm:ss')}</span>

          <h6 className="text-muted mb-0">Категория</h6>
          <span>
            <i
              className={`${expense.categories.icon} rounded-circle py-1 px-2 text-white`}
              style={{ backgroundColor: expense.categories.color }}
            />
            <span className="ms-2">{expense.categories.title}</span>
          </span>

          {expense?.subcategories && (
            <>
              <h6 className="text-muted mb-0">Подкатегория</h6>
              <span
                style={{ backgroundColor: expense.categories.color }}
                className="text-white px-2 rounded-5 align-self-start"
              >
                {expense.subcategories.title}
              </span>
            </>
          )}

          <Button
            variant="link"
            className="text-decoration-none text-uppercase text-danger align-self-end"
            onClick={() => handleDeleteExpense(expense.id)}
          >
            Удалить
          </Button>
        </div>
      )}
    </>
  );
});

export default ExpenseDetailsModal;
