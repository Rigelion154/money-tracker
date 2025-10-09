import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment/moment';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import ExpenseCategoryList from '../../components/expenses/categories/ExpenseCategoryList.tsx';
import PeriodBar from '../../components/layuot/PeriodBar/PeriodBar.tsx';

const MainPage = observer(() => {
  const { userId } = authStore;
  const { activePeriod } = expensesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startDate = activePeriod && moment().startOf(activePeriod).format('YYYY-MM-DD');
    const endDate = activePeriod && moment().endOf(activePeriod).format('YYYY-MM-DD');

    if (userId) {
      expensesStore.getUserExpenses(userId, startDate, endDate).finally(() => setIsLoading(false));
    }
  }, [userId, activePeriod]);

  return (
    <div className="w-100 py-3 pb-5">
      {isLoading && <BaseLoader />}
      {!isLoading && (
        <>
          <ExpenseCategoryList />
          <PeriodBar />
        </>
      )}
    </div>
  );
});

export default MainPage;
