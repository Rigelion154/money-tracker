import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../../store/ExpensesStore.ts';

import ExpensesCategoryItem from './ExpensesItem.tsx';

const ExpensesCategoryList = observer(() => {
  const { v2expenses } = expensesStore;

  return (
    <div className="d-flex flex-column align-items-center gap-2 w-100">
      {v2expenses.map((expenseCategory) => (
        <ExpensesCategoryItem expenseCategory={expenseCategory} />
      ))}
    </div>
  );
});

export default ExpensesCategoryList;
