import { Divider } from 'primereact/divider';
import moment from 'moment';

import type { IExpenseCategory } from '../../types/expenses.types.ts';

import { groupExpensesByDate } from '../../utils/groupExpensesByDate.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import styles from './Expenses.module.css';

interface IExpenseListProps {
  category: IExpenseCategory;
  handleExpenseClick: (id: string) => void;
}

const ExpenseList = ({ category, handleExpenseClick }: IExpenseListProps) => {
  const groupedExpenses = groupExpensesByDate(category.expenses);

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
              <span style={{ color: category.color }} className="col-6">
                {expense.subcategory_id
                  ? category?.subcategories?.find(
                      (subcategory) => subcategory.id === expense.subcategory_id,
                    )?.title
                  : category.title}
              </span>
              <span className="col-6 text-end">{getCurrencyString(expense.amount)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
