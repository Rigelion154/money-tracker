import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import { useEffect, useState } from 'react';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import AddExpenseForm from '../../components/AddExpenseForm.tsx';

const AddTransactionPage = () => {
  const { categories } = categoriesStore;
  const [isLoading, setIsLoading] = useState(!categories);

  useEffect(() => {
    if (!categories) {
      categoriesStore.getCategories().finally(() => setIsLoading(false));
    }
  }, [categories]);

  return (
    <div>
      <Link
        to={ROUTES.MAIN}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Button variant="warning">Назад</Button>
      </Link>

      {!isLoading && categories && <AddExpenseForm />}
    </div>
  );
};

export default AddTransactionPage;
