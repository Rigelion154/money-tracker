import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { modalStore } from '../../store/ModalStore.ts';
import ExpenseSubcategoryModal from './ExpenseSubcategoryModal.tsx';
import type { ICategory, ISubcategory, IV2ExpenseSubcategory } from '../../types/expenses.types.ts';

interface ISubcategoryProps {
  subcategory: IV2ExpenseSubcategory;
  subcategories: Record<string, ISubcategory>;
  category: ICategory;
}

const V2Subcategory = ({ subcategory, subcategories, category }: ISubcategoryProps) => {
  const handleSubcategoryClick = () => {
    modalStore.openModal({
      children: (
        <ExpenseSubcategoryModal
          subcategoryId={subcategory.subcategoryId}
          subcategory={subcategory}
          category={category}
        />
      ),
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
      <div className="col-6">{subcategories[subcategory.subcategoryId].title}</div>
      <div className="col-2 text-center">{subcategory.percentage}%</div>
      <div className="col-4 text-end">{getCurrencyString(subcategory.totalAmount)}</div>
    </div>
  );
};

export default V2Subcategory;