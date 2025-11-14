import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import type { IExpense } from '../../../types/expenses.types.ts';

import { dbClient } from '../../../db/dbClient.ts';
import { appToaster } from '../../../store/AppToaster.ts';
import { groupExpensesByDate } from '../../../utils/groupExpensesByDate.ts';

import CloseModalButton from '../../ui/CloseModalButton.tsx';
import BaseLoader from '../../helpers/BaseLoader.tsx';
import V2ExpensesList from '../V2ExpensesList.tsx';

const ExpensesTotalBarModal = observer(() => {
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

        <V2ExpensesList expenses={data} />
      </div>
    )
  );
});

export default ExpensesTotalBarModal;
