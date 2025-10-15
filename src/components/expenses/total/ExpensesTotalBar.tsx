import { Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { modalStore } from '../../../store/ModalStore.ts';
import { expensesStore } from '../../../store/ExpensesStore.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';

import ExpensesTotalModal from './ExpensesTotalModal.tsx';

const ExpensesTotalBar = observer(() => {
  const { totalAmount } = expensesStore;

  const handleTotalModal = () => modalStore.openModal({ children: <ExpensesTotalModal /> });

  return (
    <Card
      className="col-10 col-md-7 col-xl-3 mb-3 rounded-4 text-white gradient-animated-purple"
      onClick={handleTotalModal}
      role="button"
    >
      <Card.Body className="d-flex align-items-center justify-content-between gap-3">
        <span className="mb-0">Общий расход</span>
        <span>{getCurrencyString(totalAmount)}</span>
      </Card.Body>
    </Card>
  );
});

export default ExpensesTotalBar;
