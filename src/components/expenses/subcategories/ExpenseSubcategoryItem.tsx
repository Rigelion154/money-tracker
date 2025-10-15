import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import type { IExpenseSubcategory } from '../../../types/expenses.types.ts';

import { calculatePercentage } from '../../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';
import { modalStore } from '../../../store/ModalStore.ts';

import ExpenseSubcategoryModal from './ExpenseSubcategoryModal.tsx';

interface ISubcategoryItemProps {
  subcategory: IExpenseSubcategory;
  categoryTotal: number;
  color: string;
}
const ExpenseSubcategoryItem = observer(
  ({ categoryTotal, color, subcategory }: ISubcategoryItemProps) => {
    const percentage = useMemo(
      () => calculatePercentage(categoryTotal, subcategory.subcategory_total_amount),
      [categoryTotal, subcategory.subcategory_total_amount],
    );
    const currencyString = useMemo(
      () => getCurrencyString(subcategory.subcategory_total_amount),
      [subcategory.subcategory_total_amount],
    );

    const handleSubcategoryClick = () => {
      modalStore.openModal({
        children: <ExpenseSubcategoryModal subcategoryId={subcategory.id} />,
      });
    };

    if (subcategory.expenses.length < 3) {
      return null;
    }

    return (
      <div
        className="d-flex rounded-0 py-1 px-2 shadow-none text-white"
        style={{ backgroundColor: color }}
        role="button"
        onClick={handleSubcategoryClick}
      >
        <div className="col-6">{subcategory.title}</div>
        <div className="col-2 text-center">{percentage}%</div>
        <div className="col-4 text-end">{currencyString}</div>
      </div>
    );
  },
);

export default ExpenseSubcategoryItem;