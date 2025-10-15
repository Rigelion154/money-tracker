import { observer } from 'mobx-react-lite';
import moment from 'moment/moment';
import { Button } from 'react-bootstrap';

import { useExpenseDetails } from '../../hooks/useExpenseDetails.ts';

import BaseLoader from '../helpers/BaseLoader.tsx';
import CloseModalButton from '../ui/CloseModalButton.tsx';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

const ExpenseDetailsModal = observer(({ id }: { id: string }) => {
  const { isLoading, expense, handleDeleteExpense } = useExpenseDetails(id);

  return (
    <>
      {isLoading && <BaseLoader variant="light" />}

      {!isLoading && expense && (
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
          </div>

          {expense?.subcategories && (
            <div className="border px-2 py-1 rounded-3 shadow-sm">
              <div className="text-muted">Подкатегория:</div>
              <span
                style={{ backgroundColor: expense.categories.color }}
                className="text-white px-2 rounded-5 align-self-start"
              >
                {expense.subcategories.title}
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
});

export default ExpenseDetailsModal;
