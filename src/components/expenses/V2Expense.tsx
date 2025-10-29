import moment from 'moment';
import { observer } from 'mobx-react-lite';

import type { ICategory, IExpense } from '../../types/expenses.types.ts';

import { modalStore } from '../../store/ModalStore.ts';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';

import styles from './Expenses.module.css';

interface IExpenseProps {
  expenses: IExpense[];
  date: string;
  category?: ICategory;
}

const V2Expense = observer(({ date, expenses, category }: IExpenseProps) => {
  const { subcategories } = subcategoriesStore;
  const handleExpenseClick = (expense: IExpense) => {
    modalStore.openModal({
      children: (
        <ExpenseDetailsModal
          expense={expense}
          category={category}
          subcategory={expense.subcategory_id ? subcategories?.[expense.subcategory_id] : undefined}
        />
      ),
    });
  };

  return (
    <>
      <div className="d-flex align-items-center lh-lg">
        <div className="flex-grow-1 bg-secondary-subtle" style={{ height: '1px' }} />
        <small className="px-2 text-muted">{moment(date).format('DD MMMM YYYY')}</small>
        <div className="flex-grow-1 bg-secondary-subtle" style={{ height: '1px' }} />
      </div>

      {expenses.map((expense) => (
        <div
          className={styles.expense__list_wrapper}
          key={expense.id + expense.category_id}
          onClick={() => handleExpenseClick(expense)}
        >
          <span style={{ color: category?.color ?? 'black' }}>
            {expense.subcategory_id
              ? subcategories?.[expense.subcategory_id].title
              : category
                ? category.title
                : ''}
          </span>

          <span className="text-end">{getCurrencyString(expense.amount)}</span>
        </div>
      ))}
    </>
  );
});

export default V2Expense;
