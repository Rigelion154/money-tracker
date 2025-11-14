import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../../store/ExpensesStore.ts';

import ExpensesCategoryItem from './ExpensesItem.tsx';

const ExpensesCategoryList = observer(() => {
  const { v2expenses } = expensesStore;

  return v2expenses.map((expenseCategory) => (
    <ExpensesCategoryItem expenseCategory={expenseCategory} />
  ));
});

export default ExpensesCategoryList;
