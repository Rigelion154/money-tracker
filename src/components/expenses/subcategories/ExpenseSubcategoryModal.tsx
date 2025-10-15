import { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import type { IGroupedExpenses, ISubcategory } from '../../../types/expenses.types.ts';

import { dbClient } from '../../../db/dbClient.ts';
import { authStore } from '../../../store/AuthStore.ts';
import { appToaster } from '../../../store/AppToaster.ts';
import { modalStore } from '../../../store/ModalStore.ts';
import { groupExpensesByDate } from '../../../utils/groupExpensesByDate.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';

import CloseModalButton from '../../ui/CloseModalButton.tsx';
import ExpenseDetailsModal from '../ExpenseDetailsModal.tsx';
import BaseLoader from '../../helpers/BaseLoader.tsx';

import styles from '../Expenses.module.css';

const ExpenseSubcategoryModal = observer(({ subcategory }: { subcategory: ISubcategory }) => {
  const { userId } = authStore;
  const [expenses, setExpenses] = useState<IGroupedExpenses | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleExpenseClick = (id: string) => {
    modalStore.openModal({
      children: <ExpenseDetailsModal id={id} />,
    });
  };

  useEffect(() => {
    dbClient
      .rpc('get_subcategory_expenses', { id_user: userId, id_subcategory: subcategory.id })
      .then(({ data, error }) => {
        if (error) return appToaster.addToast('Ошибка загрузки данных', 'error');

        if (data) {
          setExpenses(groupExpensesByDate(data));
        }

        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <BaseLoader variant="light" />}

      {!isLoading && expenses && (
        <div className="modal__content expenses__subcategory_modal">
          <div className="text-end">
            <CloseModalButton />
          </div>

          {Object.entries(expenses ?? {}).map(([date, expenses]) => (
            <div key={date}>
              <Divider className="fs__small py-1 text-muted">
                {moment(date).format('DD MMMM YYYY')}
              </Divider>

              {expenses.map((expense) => (
                <div
                  className={styles.expense__list_wrapper}
                  key={expense.id + expense.category_id}
                  onClick={() => handleExpenseClick(expense.id)}
                >
                  <span>{subcategory.title}</span>
                  <span className="text-end">{getCurrencyString(expense.amount)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
});

export default ExpenseSubcategoryModal;
