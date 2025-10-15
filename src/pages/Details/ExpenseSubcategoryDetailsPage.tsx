import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useSubcategoryDetails } from '../../hooks/useSubcategoryDetails.ts';

import ExpenseList from '../../components/expenses/categories/ExpenseList.tsx';
import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import PrevPageButton from '../../components/ui/PrevPageButton.tsx';

const ExpenseSubcategoryDetailsPage = observer(() => {
  const { id } = useParams();
  const { subcategory, isLoading, expenses } = useSubcategoryDetails(id ?? '');

  return (
    <div className="w-100 d-flex flex-column gap-2">
      {isLoading && <BaseLoader />}

      {!isLoading && expenses && subcategory && (
        <>
          <div>
            <PrevPageButton />
          </div>
          <ExpenseList {...{ category: subcategory, expenses, type: 'subcategory' }} />
        </>
      )}
    </div>
  );
});

export default ExpenseSubcategoryDetailsPage;