import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import type { IExpenseDetails } from '../../types/expenses.types.ts';

import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { expensesStore } from '../../store/ExpensesStore.ts';
import { appToaster } from '../../store/AppToaster.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../helpers/BaseLoader.tsx';
import CloseModalButton from '../ui/CloseModalButton.tsx';

const ExpenseDetailsModal = observer(({ id }: { id: string }) => {
  const { userId } = authStore;
  const [expense, setExpense] = useState<IExpenseDetails | null>(null);
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
            <h6 className="mb-0">Сумма</h6>
            <CloseModalButton />
          </div>
          <span>{getCurrencyString(expense.amount)}</span>

          <h6 className="mb-0">Дата</h6>
          <span>{moment(expense.date).format('DD.MM.YYYY HH:mm:ss')}</span>

          <h6 className="mb-0">Категория</h6>
          <div className="col-6 px-0 d-flex align-items-center gap-2">
            <i
              className={`${expense.categories.icon} rounded-circle text-white align-items-center justify-content-center`}
              style={{
                backgroundColor: expense.categories.color,
                width: '30px',
                height: '30px',
                display: 'inline-flex',
              }}
            />
            <span>{expense.categories.title}</span>
          </div>

          {expense?.subcategories && (
            <>
              <h6 className="mb-0">Подкатегория</h6>
              <span
                style={{ backgroundColor: expense.categories.color }}
                className="text-white px-2 rounded-5 align-self-start"
              >
                {expense.subcategories.title}
              </span>
            </>
          )}

          <Button
            variant="outline-danger"
            size="sm"
            className="text-uppercase align-self-end border-0"
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
