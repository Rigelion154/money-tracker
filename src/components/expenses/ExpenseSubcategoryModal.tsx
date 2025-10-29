import { observer } from 'mobx-react-lite';

import type { IV2ExpenseSubcategory } from '../../types/expenses.types.ts';

import CloseModalButton from '../ui/CloseModalButton.tsx';
import V2ExpensesList from './V2ExpensesList.tsx';

interface ModalProps {
  subcategory: IV2ExpenseSubcategory;
}

const ExpenseSubcategoryModal = observer(({ subcategory }: ModalProps) => {
  return (
    <div className="modal__content expenses__subcategory_modal">
      <div className="text-end">
        <CloseModalButton />
      </div>

      <V2ExpensesList expenses={subcategory.expenses} />
    </div>
  );
});

export default ExpenseSubcategoryModal;
