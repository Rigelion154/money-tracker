import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import ExpenseCategoryList from '../../components/expenses/ExpenseCategoryList.tsx';
import PeriodBar from '../../components/layuot/PeriodBar/PeriodBar.tsx';

const MainPage = observer(() => {
  const { userId } = authStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    expensesStore.getUserExpenses(userId ?? '').finally(() => setIsLoading(false));
  }, [userId]);

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
