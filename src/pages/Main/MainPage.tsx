import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Spinner } from 'react-bootstrap';

import { ROUTES } from '../../routes/routes.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { authStore } from '../../store/AuthStore.ts';
import { dbClient } from '../../db/dbClient.ts';

const MainPage = observer(() => {
  const { categories } = categoriesStore;
  const { session, userId } = authStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore
      .getCategories(userId ?? '')
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center p-3 h-100">
          <Spinner variant="primary" />
        </div>
      )}
      {!isLoading && categories && (
        <>
          <Link
            to={ROUTES.ADD_TRANSACTION}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button variant="warning">Добавить расход</Button>
          </Link>
          <Button onClick={authStore.logoutUser}>Выход</Button>
          <Button
            onClick={async () => {
              const { data } = await dbClient
                .from('categories')
                .insert({ title: 'test', icon: 'bi-balloon', user_id: userId });

              console.log(data);
            }}
          >
            Создать категорию
          </Button>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <pre>{JSON.stringify(categories, null, 2)}</pre>
        </>
      )}
    </>
  );
});

export default MainPage;
