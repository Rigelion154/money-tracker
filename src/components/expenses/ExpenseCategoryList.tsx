import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { modalStore } from '../../store/ModalStore.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';
import ExpensesTotalBar from './ExpensesTotalBar.tsx';
import { useCallback } from 'react';
import ExpenseCategoryItem from './ExpenseCategoryItem.tsx';

const ExpenseCategoryList = observer(() => {
  const { totalAmount, expenses } = expensesStore;

  const handleExpenseClick = useCallback(
    () => async (id: string) => modalStore.openModal({ children: <ExpenseDetailsModal id={id} /> }),
    [],
  );

  return (
    <div className="row flex-column justify-content-center align-items-center gap-2">
      <ExpensesTotalBar />

      {expenses.map((category) => (
        <ExpenseCategoryItem
          category={category}
          handleExpenseClick={handleExpenseClick}
          totalAmount={totalAmount}
          key={category.id}
        />
      ))}
    </div>
  );
});

export default ExpenseCategoryList;
