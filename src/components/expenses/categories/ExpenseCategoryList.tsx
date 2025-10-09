import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../../store/ExpensesStore.ts';

import ExpensesTotalBar from '../total/ExpensesTotalBar.tsx';
import ExpenseCategoryItem from './ExpenseCategoryItem.tsx';

const ExpenseCategoryList = observer(() => {
  const { totalAmount, expenses } = expensesStore;

  return (
    <div className="row flex-column justify-content-center align-items-center gap-2">
      <ExpensesTotalBar />

      {expenses.map((category) => (
        <ExpenseCategoryItem {...{ category, totalAmount }} key={category.id} />
      ))}
    </div>
  );
});

export default ExpenseCategoryList;
