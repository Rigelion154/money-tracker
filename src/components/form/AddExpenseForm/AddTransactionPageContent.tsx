import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { authStore } from '../../../store/AuthStore.ts';
import { categoriesStore } from '../../../store/CategoriesStore.ts';

import BaseLoader from '../../helpers/BaseLoader.tsx';
import PrevPageButton from '../../ui/PrevPageButton.tsx';
import ExpenseForm from './components';

const AddTransactionPageContent = observer(() => {
  const { userId } = authStore;
  const { categories } = categoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoriesStore.getCategories(userId ?? '').finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="d-flex flex-column flex-grow-1">
      {isLoading && <BaseLoader />}
      {!isLoading && categories && (
        <>
          <PrevPageButton />

          <ExpenseForm.FormWrapper {...{ setIsLoading }}>
            <ExpenseForm.CategoryButtons />
            <ExpenseForm.CategoryList />
            <ExpenseForm.SubcategoryButtons />
            <ExpenseForm.SubcategoryList />
            <ExpenseForm.CurrencyField />
            <ExpenseForm.SubmitButton />
          </ExpenseForm.FormWrapper>
        </>
      )}
    </div>
  );
});

export default AddTransactionPageContent;
