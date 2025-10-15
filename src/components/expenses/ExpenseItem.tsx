import { observer } from 'mobx-react-lite';
// import { Divider } from 'primereact/divider';

import type { IExpense, IExpenseCategory, ISubcategory } from '../../types/expenses.types.ts';

import { modalStore } from '../../store/ModalStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';

import styles from './Expenses.module.css';

interface IItemProps {
  date: string;
  expenses: IExpense[];
  category: IExpenseCategory | ISubcategory;
  type: 'category' | 'subcategory';
}

const ExpenseItem = observer(({ expenses, date, category, type }: IItemProps) => {
  const handleExpenseClick = (id: string) => {
    modalStore.openModal({
      children: <ExpenseDetailsModal id={id} />,
    });
  };

  return (
    <div key={date}>
      {/*<Divider className="fs__small py-1 text-muted">{moment(date).format('DD MMMM YYYY')}</Divider>*/}

      {expenses.map((expense) => (
        <div
          className={styles.expense__list_wrapper}
          key={expense.id + expense.category_id}
          onClick={() => handleExpenseClick(expense.id)}
        >
          {type === 'subcategory' && <span>{category.title}</span>}

          {type === 'category' && (
            <span style={{ color: (category as IExpenseCategory)?.color }}>
              {(category as IExpenseCategory)?.subcategories?.find(
                (subcategory) => subcategory.id === expense.subcategory_id,
              )?.title ?? category.title}
            </span>
          )}

          <span className="text-end">{getCurrencyString(expense.amount)}</span>
        </div>
      ))}
    </div>
  );
});

export default ExpenseItem;