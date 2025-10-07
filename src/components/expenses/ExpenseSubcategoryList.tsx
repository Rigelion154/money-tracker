import moment from 'moment';
import { useMemo } from 'react';
import { Accordion } from 'react-bootstrap';

import type { IExpenseCategory, IExpenseSubcategory } from '../../types/expenses.types.ts';

import { DEFAULT_TIME_FORMAT } from '../../utils/constants.ts';
import { calculatePercentage } from '../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

interface ISubcategoryListProps {
  category: IExpenseCategory;
  subcategory: IExpenseSubcategory;
  handleExpenseClick: (id: string) => void;
}

const ExpenseSubcategoryList = ({
  category,
  subcategory,
  handleExpenseClick,
}: ISubcategoryListProps) => {
  const totalAmountPercentage = useMemo(
    () => calculatePercentage(category.category_total_amount, subcategory.subcategory_total_amount),
    [category.category_total_amount, subcategory.subcategory_total_amount],
  );

  return (
    <Accordion key={subcategory.id} className="px-1">
      <Accordion.Button
        className="rounded-0 py-1 px-2 shadow-none text-white"
        style={{ backgroundColor: category.color }}
      >
        <div className="col-6">{subcategory.title}</div>
        <div className="col-2 text-center">{totalAmountPercentage}%</div>
        <div className="col-4 text-end">
          {getCurrencyString(subcategory.subcategory_total_amount)}
        </div>
      </Accordion.Button>

      <Accordion.Body className="px-2 py-1 border bg-light">
        {subcategory.expenses.map((expense) => (
          <div
            className="d-flex align-items-center"
            key={expense.id + expense.subcategory_id}
            onClick={() => handleExpenseClick(expense.id)}
          >
            <div className="col-6">{moment(expense.date).format(DEFAULT_TIME_FORMAT)}</div>
            <div className="col-2 text-center">
              {calculatePercentage(category.category_total_amount, expense.amount)}%
            </div>
            <div className="col-4 text-end">{getCurrencyString(expense.amount)}</div>
          </div>
        ))}
      </Accordion.Body>
    </Accordion>
  );
};

export default ExpenseSubcategoryList;
