import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useExpenseDetails } from '../../hooks/useExpenseDetails.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import ExpenseDetails from '../../components/expenses/ExpenseDetails.tsx';
import PrevPageButton from '../../components/ui/PrevPageButton.tsx';

const ExpenseDetailsPage = observer(() => {
  const { id } = useParams();
  const { expense, handleDeleteExpense, isLoading } = useExpenseDetails(id ?? '');

  return (
    <div className="w-100 d-flex flex-column gap-2">
      {isLoading && <BaseLoader />}

      {!isLoading && expense && (
        <>
          <div>
            <PrevPageButton />
          </div>
          <ExpenseDetails {...{ expense, handleDeleteExpense }} />
        </>
      )}
    </div>
  );
});

export default ExpenseDetailsPage;
