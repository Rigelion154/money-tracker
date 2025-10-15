import { Divider } from 'primereact/divider';
import moment from 'moment';

import type { IExpenseCategory } from '../../../types/expenses.types.ts';

import { modalStore } from '../../../store/ModalStore.ts';
import { groupExpensesByDate } from '../../../utils/groupExpensesByDate.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';

import ExpenseDetailsModal from '../ExpenseDetailsModal.tsx';

import styles from '../Expenses.module.css';
import { observer } from 'mobx-react-lite';
import { screenStore } from '../../../store/ScreenStore.ts';
import { useNavigate } from 'react-router-dom';

interface IExpenseListProps {
  category: IExpenseCategory;
}

const ExpenseList = observer(({ category }: IExpenseListProps) => {
  const { isMobile } = screenStore;
  const groupedExpenses = groupExpensesByDate(category.expenses);
  const navigate = useNavigate();

  const handleExpenseClick = (id: string) => {
    if (isMobile) {
      navigate(`expense/${id}`);
    }

    if (!isMobile) {
      modalStore.openModal({
        children: <ExpenseDetailsModal id={id} />,
      });
    }
  };

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
});

export default ExpenseList;
