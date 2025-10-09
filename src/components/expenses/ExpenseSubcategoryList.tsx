import moment from 'moment';
import { Accordion } from 'react-bootstrap';

import type { IExpenseCategory } from '../../types/expenses.types.ts';

import { DEFAULT_TIME_FORMAT } from '../../utils/constants.ts';
import { calculatePercentage } from '../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import styles from './Expenses.module.css';

interface ISubcategoryListProps {
  category: IExpenseCategory;
  handleExpenseClick: (id: string) => void;
}

const ExpenseSubcategoryList = ({ category, handleExpenseClick }: ISubcategoryListProps) => {
  return (
    <div className="rounded-2 overflow-hidden">
      {category?.subcategories.map(
        (subcategory) =>
          subcategory.expenses.length > 1 && (
            <Accordion className="px-0" key={subcategory.id}>
              <Accordion.Item eventKey={subcategory.id}>
                <Accordion.Header
                  className="rounded-0 py-1 px-2 shadow-none text-white"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="col-6">{subcategory.title}</div>
                  <div className="col-2 text-center">
                    {calculatePercentage(
                      category.category_total_amount,
                      subcategory.subcategory_total_amount,
                    )}
                    %
                  </div>
                  <div className="col-4 text-end">
                    {getCurrencyString(subcategory.subcategory_total_amount)}
                  </div>
                </Accordion.Header>

                <Accordion.Body className="p-1 border bg-light">
                  {subcategory.expenses.map((expense) => (
                    <div
                      className={styles.expense__list_wrapper}
                      key={expense.id + expense.subcategory_id}
                      id={expense.id + expense.subcategory_id}
                      onClick={() => handleExpenseClick(expense.id)}
                    >
                      <div className="col-6">
                        {moment(expense.date).format(DEFAULT_TIME_FORMAT)}
                      </div>
                      <div className="col-2 text-center">
                        {calculatePercentage(category.category_total_amount, expense.amount)}%
                      </div>
                      <div className="col-4 text-end">{getCurrencyString(expense.amount)}</div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ),
      )}
    </div>
  );
};

export default ExpenseSubcategoryList;
