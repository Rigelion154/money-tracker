import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ROUTES } from '../../routes/routes.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import AddExpenseForm from '../../components/AddExpenseForm.tsx';

const AddTransactionPage = observer(() => {
  const { categories } = categoriesStore;
  const { userId } = authStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore
      .getCategories(userId ?? '')
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <BaseLoader />}
      {!isLoading && categories && (
        <div>
          <Link
            to={ROUTES.MAIN}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button variant="warning" size="lg" className="rounded-1">
              <i className="bi bi-arrow-left me-2"></i>
              Назад
            </Button>
          </Link>

          <AddExpenseForm />
        </div>
      )}
    </>
  );
});

export default AddTransactionPage;
