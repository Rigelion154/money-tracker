import { observer } from 'mobx-react-lite';

import CloseModalButton from '../ui/CloseModalButton.tsx';
import BaseLoader from '../helpers/BaseLoader.tsx';
import { useSubcategoryDetails } from '../../hooks/useSubcategoryDetails.ts';
import V2Expense from './V2Expense.tsx';
import type { ICategory, IV2ExpenseSubcategory } from '../../types/expenses.types.ts';

const ExpenseSubcategoryModal = observer(
  ({
    subcategoryId,
    subcategory,
    category,
  }: {
    subcategoryId: string;
    subcategory: IV2ExpenseSubcategory;
    category: ICategory;
  }) => {
    const { isLoading, expenses } = useSubcategoryDetails(subcategoryId);

    return (
      <>
        {isLoading && <BaseLoader variant="light" />}

        {!isLoading && expenses && subcategory && (
          <div className="modal__content expenses__subcategory_modal">
            <div className="text-end">
              <CloseModalButton />
            </div>

            {Object.entries(subcategory.expenses).map(([date, expenses]) => (
              <V2Expense {...{ expenses, date, category }} key={date} />
            ))}
          </div>
        )}
      </>
    );
  },
);

export default ExpenseSubcategoryModal;
