import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import moment from 'moment';

import type { IExpense } from '../../../types/expenses.types.ts';

import { dbClient } from '../../../db/dbClient.ts';
import { appToaster } from '../../../store/AppToaster.ts';
import { groupExpensesByDate } from '../../../utils/groupExpensesByDate.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';

import CloseModalButton from '../../ui/CloseModalButton.tsx';
import BaseLoader from '../../helpers/BaseLoader.tsx';

import styles from '../Expenses.module.css';

const ExpensesTotalModal = observer(() => {
  // const { categories } = categoriesStore;
  const [data, setData] = useState<Record<IExpense['date'], IExpense[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dbClient
      .from('expenses')
      .select(`*, category: categories(title, color), subcategory: subcategories(title)`)
      .then(({ data, error }) => {
        if (error) return appToaster.addToast('Ошибка загрузки расходов', 'error');

        const groupedData = groupExpensesByDate(data);
        setData(groupedData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <BaseLoader variant="light" />;
  }

  return (
    !isLoading &&
    data && (
      <div className="modal__content expenses__total_modal">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0">История</h5>
          <CloseModalButton />
        </div>

        {Object.entries(data).map(([date, expenses]) => (
          <div key={date}>
            <Divider className="fs__small py-1 text-muted">
              {moment(date).format('DD MMMM YYYY')}
            </Divider>

            {expenses.map((expense) => (
              <div
                className={styles.expense__list_wrapper}
                key={expense.id + expense.category_id}
                // onClick={() => handleExpenseClick(expense.id)}
              >
                <span style={{ color: expense?.category?.color }}>
                  {expense?.subcategory?.title ?? expense?.category?.title}
                </span>
                <span className="text-end">{getCurrencyString(expense.amount)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  );
});

export default ExpensesTotalModal;
