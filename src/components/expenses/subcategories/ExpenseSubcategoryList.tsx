import type { IExpenseCategory } from '../../../types/expenses.types.ts';

import ExpenseSubcategoryItem from './ExpenseSubcategoryItem.tsx';

interface ISubcategoryListProps {
  category: IExpenseCategory;
}

const ExpenseSubcategoryList = ({ category }: ISubcategoryListProps) => {
  return (
    <div className="rounded-2 overflow-hidden">
      {category?.subcategories.map((subcategory) => (
        <ExpenseSubcategoryItem {...{ subcategory, category }} key={subcategory.id} />
      ))}
    </div>
  );
};

export default ExpenseSubcategoryList;
