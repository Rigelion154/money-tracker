import { Divider } from 'primereact/divider';
import moment from 'moment';

import type { IExpenseCategory } from '../../types/expenses.types.ts';

import { modalStore } from '../../store/ModalStore.ts';
import { groupExpensesByDate } from '../../utils/groupExpensesByDate.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';

import styles from './Expenses.module.css';

interface IExpenseListProps {
  category: IExpenseCategory;
}

const ExpenseList = ({ category }: IExpenseListProps) => {
  const groupedExpenses = groupExpensesByDate(category.expenses);

  const handleExpenseClick = (id: string) =>
    modalStore.openModal({
      children: <ExpenseDetailsModal id={id} />,
    });

  return (
    <div className="p-1">
      {Object.entries(groupedExpenses).map(([date, expenses]) => (
        <div key={date}>
          <Divider className="fs__small py-1 text-muted">
            {moment(date).format('DD MMMM YYYY')}
          </Divider>

          {expenses.map((expense) => (
            <div
              className={styles.expense__list_wrapper}
              key={expense.id + expense.category_id}
              onClick={() => handleExpenseClick(expense.id)}
            >
              <span style={{ color: category.color }}>
                {category?.subcategories?.find(
                  (subcategory) => subcategory.id === expense.subcategory_id,
                )?.title ?? category.title}
              </span>
              <span className="text-end">{getCurrencyString(expense.amount)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
