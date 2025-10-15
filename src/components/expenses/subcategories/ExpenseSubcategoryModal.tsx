import { observer } from 'mobx-react-lite';

import CloseModalButton from '../../ui/CloseModalButton.tsx';
import BaseLoader from '../../helpers/BaseLoader.tsx';
import ExpenseList from '../ExpenseList.tsx';
import { useSubcategoryDetails } from '../../../hooks/useSubcategoryDetails.ts';

const ExpenseSubcategoryModal = observer(({ subcategoryId }: { subcategoryId: string }) => {
  const { subcategory, isLoading, expenses } = useSubcategoryDetails(subcategoryId);

  return (
    <>
      {isLoading && <BaseLoader variant="light" />}

      {!isLoading && expenses && subcategory && (
        <div className="modal__content expenses__subcategory_modal">
          <div className="text-end">
            <CloseModalButton />
          </div>

          <ExpenseList {...{ category: subcategory, expenses, type: 'subcategory' }} />
        </div>
      )}
    </>
  );
});

export default ExpenseSubcategoryModal;
