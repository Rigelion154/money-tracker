import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import AddExpenseForm from '../../components/AddExpenseForm.tsx';

const AddTransactionPage = () => {
  return (
    <div>
      <Link
        to={ROUTES.MAIN}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Button variant="warning">Назад</Button>
      </Link>

      <AddExpenseForm />
    </div>
  );
};

export default AddTransactionPage;
