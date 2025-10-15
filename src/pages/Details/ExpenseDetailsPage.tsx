import { Link, useParams } from 'react-router-dom';
import { useExpenseDetails } from '../../hooks/useExpenseDetails.ts';
import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import ExpensesDetails from '../../components/expenses/ExpensesDetails.tsx';
import { ROUTES } from '../../routes/routes.ts';
import { Button } from 'react-bootstrap';

const ExpenseDetailsPage = () => {
  const { id } = useParams();
  const { expense, handleDeleteExpense, isLoading } = useExpenseDetails(id ?? '');
  return (
    <div className="w-100 d-flex flex-column gap-2">
      {isLoading && <BaseLoader />}

      {!isLoading && expense && (
        <>
          <div>
            <Link to={ROUTES.MAIN} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button variant="warning" className="rounded-4 px-4">
                <i className="bi bi-arrow-left me-2"></i>
                Назад
              </Button>
            </Link>
          </div>
          <ExpensesDetails {...{ expense, handleDeleteExpense }} />
        </>
      )}
    </div>
  );
};

export default ExpenseDetailsPage;
