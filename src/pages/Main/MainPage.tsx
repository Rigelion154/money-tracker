import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';

import { ROUTES } from '../../routes/routes.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import ExpenseList from '../../components/ExpenseList.tsx';

const MainPage = observer(() => {
  const { expenses } = categoriesStore;
  const { userId } = authStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore
      .getUserExpenses(userId ?? '')
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    await authStore.logoutUser();
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <BaseLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between mb-3">
            <Link
              to={ROUTES.ADD_TRANSACTION}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Button variant="warning">Добавить расход</Button>
            </Link>
            <Button onClick={handleLogout}>
              <span className="me-2">Выход</span>
              <span>{userId}</span>
            </Button>
          </div>
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

          <pre>{JSON.stringify(expenses, null, 2)}</pre>
        </>
      )}
    </>
  );
});

export default MainPage;
