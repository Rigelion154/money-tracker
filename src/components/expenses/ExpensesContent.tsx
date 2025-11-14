import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { useGetExpenses } from './hooks/useGetExpenses.ts';

import PeriodBar from '../layuot/PeriodBar/PeriodBar.tsx';
import BaseLoader from '../helpers/BaseLoader.tsx';
import ExpensesTotalBar from './components/ExpensesTotalBar.tsx';
import ExpensesDateBar from './components/ExpensesDateBar.tsx';
import ExpensesCategoryList from './components/ExpensesCategoryList.tsx';

import styles from './Expenses.module.css';

const ExpensesContent = observer(() => {
  const { v2expenses } = expensesStore;
  const { v2_categories } = categoriesStore;
  const { isLoading } = useGetExpenses();

  return (
    <>
      {isLoading && <BaseLoader />}
      {!isLoading && v2_categories && v2expenses.length > 0 && (
        <div className={styles.expense__wrapper}>
          <PeriodBar />
          <ExpensesTotalBar />
          <ExpensesDateBar />
          <ExpensesCategoryList />
        </div>
      )}
    </>
  );
});

export default ExpensesContent;
