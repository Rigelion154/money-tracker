import { useMemo } from 'react';
import { Accordion } from 'react-bootstrap';
import moment from 'moment';

import type { IExpenseCategory, IExpenseSubcategory } from '../../../types/expenses.types.ts';

import { modalStore } from '../../../store/ModalStore.ts';
import { calculatePercentage } from '../../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../../utils/getCurrencyString.ts';
import { FULL_MONTH_FORMAT } from '../../../utils/constants.ts';

import ExpenseDetailsModal from '../ExpenseDetailsModal.tsx';

import styles from '../Expenses.module.css';

interface ISubcategoryItemProps {
  subcategory: IExpenseSubcategory;
  category: IExpenseCategory;
}

const ExpenseSubcategoryItem = ({ subcategory, category }: ISubcategoryItemProps) => {
  const percentage = useMemo(
    () => calculatePercentage(category.category_total_amount, subcategory.subcategory_total_amount),
    [category.category_total_amount, subcategory.subcategory_total_amount],
  );
  const currencyString = useMemo(
    () => getCurrencyString(subcategory.subcategory_total_amount),
    [subcategory.subcategory_total_amount],
  );

  const handleExpenseClick = (id: string) =>
    modalStore.openModal({
      children: <ExpenseDetailsModal id={id} />,
    });

  if (subcategory.expenses.length < 5) {
    return null;
  }

  return (
    <Accordion className="px-0" key={subcategory.id}>
      <Accordion.Item eventKey={subcategory.id}>
        <Accordion.Button
          className="rounded-0 py-1 px-2 shadow-none text-white"
          style={{ backgroundColor: category.color }}
        >
          <div className="col-6">{subcategory.title}</div>
          <div className="col-2 text-center">{percentage}%</div>
          <div className="col-4 text-end">{currencyString}</div>
        </Accordion.Button>

        <Accordion.Body className="p-1 border bg-light">
          {subcategory.expenses.map((expense) => (
            <div
              className={styles.expense__list_wrapper}
              key={expense.id + expense.subcategory_id}
              id={expense.id + expense.subcategory_id}
              onClick={() => handleExpenseClick(expense.id)}
            >
              <div className="">{moment(expense.date).format(FULL_MONTH_FORMAT)}</div>
              <div className=" text-end">{getCurrencyString(expense.amount)}</div>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ExpenseSubcategoryItem;
