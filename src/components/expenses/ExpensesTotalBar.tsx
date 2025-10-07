import { Card } from 'react-bootstrap';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { expensesStore } from '../../store/ExpensesStore.ts';
import { observer } from 'mobx-react-lite';

const ExpensesTotalBar = observer(() => {
  const { totalAmount } = expensesStore;

  return (
    <Card className="col-10 col-md-7 col-xl-3 mb-3 rounded-4 text-white gradient-animated-purple">
      <Card.Body className="d-flex align-items-center justify-content-between gap-3">
        <span className="mb-0">Общий расход</span>
        <span>{getCurrencyString(totalAmount)}</span>
      </Card.Body>
    </Card>
  );
});

export default ExpensesTotalBar;
