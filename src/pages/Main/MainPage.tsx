import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import { useEffect, useState } from 'react';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/AuthStore.ts';

const MainPage = observer(() => {
  const { categories } = categoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore.getCategories().finally(() => setIsLoading(false));
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
          <pre>{JSON.stringify(categories, null, 2)}</pre>
        </>
      )}
    </>
  );
});

export default MainPage;
