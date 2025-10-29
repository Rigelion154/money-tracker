import { observer } from 'mobx-react-lite';
import moment from 'moment/moment';
import { Button } from 'react-bootstrap';

import BaseLoader from '../helpers/BaseLoader.tsx';
import CloseModalButton from '../ui/CloseModalButton.tsx';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import type { ICategory, IExpense, ISubcategory } from '../../types/expenses.types.ts';
import { expensesStore } from '../../store/ExpensesStore.ts';
import { appToaster } from '../../store/AppToaster.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { useState } from 'react';

const ExpenseDetailsModal = observer(
  ({
    expense,
    category,
    subcategory,
  }: {
    expense: IExpense;
    category?: ICategory;
    subcategory?: ISubcategory;
  }) => {
    // const { isLoading, handleDeleteExpense } = useExpenseDetails();
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteExpense = async (id: string) => {
      setIsLoading(true);
      const { data, error } = await expensesStore.deleteExpenseById(id);
      if (data) {
        appToaster.addToast('Транзакция успешно удалена', 'success');
        // await expensesStore.getUserExpenses();
        await expensesStore.getV2Expenses();
        modalStore.resetModalList();
      }
      if (error) appToaster.addToast('Ошибка удаления транзакции', 'error');

      setIsLoading(false);
    };

    return (
      <>
        {isLoading && <BaseLoader variant="light" />}

        {!isLoading && expense && category && (
          <div className="modal__content expense__details_modal d-flex flex-column gap-2">
            <CloseModalButton />

            <div className="border px-2 py-1 rounded-3 shadow-sm">
              <div className="text-muted">Сумма:</div>
              <div className="fw-bold">{getCurrencyString(expense.amount)}</div>
            </div>

            <div className="border px-2 py-1 rounded-3 shadow-sm">
              <div className="text-muted">Дата:</div>
              <div className="fw-bold">{moment(expense.date).format('DD.MM.YYYY HH:mm:ss')}</div>
            </div>

            <div className="border px-2 py-1 rounded-3 shadow-sm">
              <div className="text-muted">Категория:</div>
              <div className="col-6 px-0 d-flex align-items-center gap-2">
                <i
                  className={`${category?.icon} rounded-circle text-white align-items-center justify-content-center`}
                  style={{
                    backgroundColor: category?.color,
                    width: '30px',
                    height: '30px',
                    display: 'inline-flex',
                  }}
                />
                <span>{category?.title}</span>
              </div>
            </div>

            {subcategory && (
              <div className="border p-2 rounded-3 shadow-sm">
                <div className="text-muted">Подкатегория:</div>
                <span
                  style={{ backgroundColor: category?.color }}
                  className="text-white px-3 pb-1 rounded-4 align-self-start"
                >
                  {subcategory.title}
                </span>
              </div>
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
  },
);

export default ExpenseDetailsModal;
