import type { IExpenseCategory } from '../../../types/expenses.types.ts';

import ExpenseSubcategoryDefaultItem from './ExpenseSubcategoryDefaultItem.tsx';

interface ISubcategoryListProps {
  category: IExpenseCategory;
}

const ExpenseSubcategoryList = ({ category }: ISubcategoryListProps) => {
  return (
    <div className="rounded-2 overflow-hidden">
      {category?.subcategories.map((subcategory) => (
        <ExpenseSubcategoryDefaultItem {...{ subcategory, category }} key={subcategory.id} />
      ))}
    </div>
  );
};

export default ExpenseSubcategoryList;
