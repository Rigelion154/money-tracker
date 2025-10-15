import { observer } from 'mobx-react-lite';

import type { IExpense, IExpenseCategory, ISubcategory } from '../../types/expenses.types.ts';

import { groupExpensesByDate } from '../../utils/groupExpensesByDate.ts';

import ExpenseItem from './ExpenseItem.tsx';

interface IExpenseListProps {
  category: IExpenseCategory | ISubcategory;
  type: 'category' | 'subcategory';
  expenses: IExpense[];
}

const ExpenseList = observer(({ category, expenses, type }: IExpenseListProps) => {
  const groupedExpenses = groupExpensesByDate(expenses);

  return (
    <>
      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <ExpenseItem {...{ expenses, date, category, type }} key={date} />
      ))}
    </>
  );
});

export default ExpenseList;
