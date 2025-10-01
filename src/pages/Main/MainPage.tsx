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
    categoriesStore
      .getUserExpenses(userId ?? '')
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <>
      {isLoading && (
        <div style={{ height: '90vh' }}>
          <BaseLoader />
        </div>
      )}
      {!isLoading && (
        <div style={{ paddingTop: '5rem' }}>
          {/*<Button*/}
          {/*  onClick={async () => {*/}
          {/*    const { data } = await dbClient*/}
          {/*      .from('categories')*/}
          {/*      .insert({ title: 'test', icon: 'bi-balloon', user_id: userId });*/}

          {/*    console.log(data);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Создать категорию*/}
          {/*</Button>*/}

          <ExpenseList />
          <PeriodBar />

          {/*<pre>{JSON.stringify(expenses, null, 2)}</pre>*/}
        </div>
      )}
    </>
  );
});

export default MainPage;
