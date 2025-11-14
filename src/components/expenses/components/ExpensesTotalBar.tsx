import { Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { modalStore } from '../../../store/ModalStore.ts';
import { screenStore } from '../../../store/ScreenStore.ts';
import { expensesStore } from '../../../store/ExpensesStore.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';

import ExpensesTotalBarModal from './ExpensesTotalBarModal.tsx';

const ExpensesTotalBar = observer(() => {
  const { totalAmount } = expensesStore;
  const { isMobile } = screenStore;

  const handleTotalModal = () => modalStore.openModal({ children: <ExpensesTotalBarModal /> });

  return (
    <div
      className={`total__bar d-flex w-100 justify-content-center px-3 ${isMobile ? 'mt-2' : 'mb-2'}`}
    >
      <Card
        className="col-12 col-md-7 col-xl-3 rounded-4 text-white gradient-animated-purple"
        onClick={handleTotalModal}
        role="button"
      >
        <Card.Body className="d-flex align-items-center justify-content-between gap-3">
          <span className="mb-0">Общий расход</span>
          <span>{getCurrencyString(totalAmount)}</span>
        </Card.Body>
      </Card>
    </div>
  );
});

export default ExpensesTotalBar;
