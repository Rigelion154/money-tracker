import { useMemo } from 'react';

import type { IExpenseCategory, IExpenseSubcategory } from '../../../types/expenses.types.ts';

import { calculatePercentage } from '../../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';
import { modalStore } from '../../../store/ModalStore.ts';

import ExpenseSubcategoryModal from './ExpenseSubcategoryModal.tsx';

interface ISubcategoryItemProps {
  subcategory: IExpenseSubcategory;
  category: IExpenseCategory;
}
const ExpenseSubcategoryDefaultItem = ({ category, subcategory }: ISubcategoryItemProps) => {
  const percentage = useMemo(
    () => calculatePercentage(category.category_total_amount, subcategory.subcategory_total_amount),
    [category.category_total_amount, subcategory.subcategory_total_amount],
  );
  const currencyString = useMemo(
    () => getCurrencyString(subcategory.subcategory_total_amount),
    [subcategory.subcategory_total_amount],
  );

  const handleSubcategoryClick = () =>
    modalStore.openModal({ children: <ExpenseSubcategoryModal subcategory={subcategory} /> });

  return (
    <div
      className="d-flex rounded-0 py-1 px-2 shadow-none text-white"
      style={{ backgroundColor: category.color }}
      role="button"
      onClick={handleSubcategoryClick}
    >
      <div className="col-6">{subcategory.title}</div>
      <div className="col-2 text-center">{percentage}%</div>
      <div className="col-4 text-end">{currencyString}</div>
    </div>
  );
};

export default ExpenseSubcategoryDefaultItem;