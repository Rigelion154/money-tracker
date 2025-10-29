import { observer } from 'mobx-react-lite';

import type { IV2ExpenseSubcategory } from '../../types/expenses.types.ts';

import { modalStore } from '../../store/ModalStore.ts';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpenseSubcategoryModal from './ExpenseSubcategoryModal.tsx';

interface ISubcategoryProps {
  subcategory: IV2ExpenseSubcategory;
}

const V2Subcategory = observer(({ subcategory }: ISubcategoryProps) => {
  const { subcategories } = subcategoriesStore;
  const handleSubcategoryClick = () => {
    modalStore.openModal({
      children: <ExpenseSubcategoryModal {...{ subcategory }} />,
    });
  };

  if (Object.values(subcategory.expenses).length < 3) {
    return null;
  }

  return (
    <div
      className="d-flex rounded-0 py-1 px-2 shadow-none text-white"
      role="button"
      onClick={handleSubcategoryClick}
    >
      <div className="col-6">{subcategories?.[subcategory.subcategoryId].title}</div>
      <div className="col-2 text-center">{subcategory.percentage}%</div>
      <div className="col-4 text-end">{getCurrencyString(subcategory.totalAmount)}</div>
    </div>
  );
});

export default V2Subcategory;
