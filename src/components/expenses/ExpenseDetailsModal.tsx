import { observer } from 'mobx-react-lite';

import { useExpenseDetails } from '../../hooks/useExpenseDetails.ts';

import BaseLoader from '../helpers/BaseLoader.tsx';
import ExpenseDetails from './ExpenseDetails.tsx';
import CloseModalButton from '../ui/CloseModalButton.tsx';

const ExpenseDetailsModal = observer(({ id }: { id: string }) => {
  const { isLoading, expense, handleDeleteExpense } = useExpenseDetails(id);

  return (
    <>
      {isLoading && <BaseLoader variant="light" />}

      {!isLoading && expense && (
        <div className="modal__content expense__details_modal d-flex flex-column gap-2">
          <CloseModalButton />
          <ExpenseDetails {...{ expense, handleDeleteExpense }} />
        </div>
      )}
    </>
  );
});

export default ExpenseDetailsModal;
