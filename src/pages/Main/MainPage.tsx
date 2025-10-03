import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import ExpenseList from '../../components/ExpenseList.tsx';
import PeriodBar from '../../components/layuot/PeriodBar/PeriodBar.tsx';

const MainPage = observer(() => {
  const { userId } = authStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore.getUserExpenses(userId ?? '').finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="w-100 py-3 pb-5">
      {isLoading && <BaseLoader />}
      {!isLoading && (
        <>
          <ExpenseList />
          <PeriodBar />
        </>
      )}
    </div>
  );
});

export default MainPage;
