import { observer } from 'mobx-react-lite';

import type { IExpense } from '../../types/expenses.types.ts';

import { modalStore } from '../../store/ModalStore.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';

import styles from './Expenses.module.scss';

interface IExpenseProps {
  expense: IExpense;
}

const V2Expense = observer(({ expense }: IExpenseProps) => {
  const { subcategories } = subcategoriesStore;
  const { v2_categories } = categoriesStore;
  const category = v2_categories?.[expense.category_id];
  const subcategory = expense.subcategory_id ? subcategories?.[expense.subcategory_id] : null;
  const handleExpenseClick = (expense: IExpense) =>
    modalStore.openModal({
      children: <ExpenseDetailsModal {...{ expense }} />,
    });

  return (
    <div
      className={styles.expense__list_wrapper}
      key={expense.id + expense.category_id}
      onClick={() => handleExpenseClick(expense)}
    >
      <span style={{ color: category?.color ?? 'black' }}>
        {subcategory ? subcategory.title : category ? category.title : ''}
      </span>

      <span className="text-end">{getCurrencyString(expense.amount)}</span>
    </div>
  );
});

export default V2Expense;
