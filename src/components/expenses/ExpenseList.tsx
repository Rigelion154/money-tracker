import type { IExpenseCategory } from '../../types/expenses.types.ts';
import { groupExpensesByDate } from '../../utils/groupExpensesByDate.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import moment from 'moment';

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
        <>
          <div className="px-2 rounded-2 fw-bold bg-secondary-subtle text-dark text-center fs__small text-capitalize">
            {moment(date).format('DD MMMM YYYY')}
          </div>
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
              {/*<small className="fw-bold text-primary col-2 text-center">*/}
              {/*  {calculatePercentage(category.category_total_amount, expense.amount)}%*/}
              {/*</small>*/}
              <span className="col-6 text-end">{getCurrencyString(expense.amount)}</span>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default ExpenseList;
