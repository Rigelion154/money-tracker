import { Accordion } from 'react-bootstrap';
import { useMemo } from 'react';

import type { IExpenseCategory } from '../../types/expenses.types.ts';

import { calculatePercentage } from '../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpenseSubcategoryList from './ExpenseSubcategoryList.tsx';
import ExpenseList from './ExpenseList.tsx';

import styles from './Expenses.module.css';

interface CategoryItemProps {
  category: IExpenseCategory;
  totalAmount: number;
}

const ExpenseCategoryItem = ({ category, totalAmount }: CategoryItemProps) => {
  const percentage = useMemo(
    () => calculatePercentage(totalAmount, category.category_total_amount),
    [totalAmount, category.category_total_amount],
  );
  const currencyString = useMemo(
    () => getCurrencyString(category.category_total_amount),
    [category.category_total_amount],
  );

  return (
    <Accordion className="col-12 col-md-8 col-xl-4">
      <Accordion.Item eventKey={category.id} className="border-0">
        <Accordion.Button className="border rounded-2 p-2 shadow-sm">
          <div className="col-6 px-0 d-flex align-items-center gap-2">
            <i
              className={`${category.icon} ${styles.expense__icon}`}
              style={{ backgroundColor: category.color }}
            />
            <span>{category.title}</span>
          </div>

          <div className="col-2 px-0 text-center">
            <small className="fw-bold text-success">{percentage}%</small>
          </div>

          <div
            className="col-4 px-0 text-end overflow-hidden fs__small"
            style={{ textOverflow: 'ellipsis' }}
          >
            <span className="fw-bold text-muted text-end">{currencyString}</span>
          </div>
        </Accordion.Button>

        <Accordion.Body className="border p-1 shadow-sm">
          <ExpenseSubcategoryList {...{ category }} />
          <ExpenseList {...{ category }} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ExpenseCategoryItem;
