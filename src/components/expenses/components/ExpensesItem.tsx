import { Accordion } from 'react-bootstrap';

import type { IV2Expense } from '../../../types/expenses.types.ts';

import { getCurrencyString } from '../../../utils/getCurrencyString.ts';
import { categoriesStore } from '../../../store/CategoriesStore.ts';

import V2Subcategory from '../V2Subcategory.tsx';
import V2ExpensesList from '../V2ExpensesList.tsx';

import styles from '../Expenses.module.scss';

const ExpensesCategoryItem = ({ expenseCategory }: { expenseCategory: IV2Expense }) => {
  const { v2_categories } = categoriesStore;
  const category = v2_categories?.[expenseCategory.categoryId];

  return (
    category && (
      <Accordion className="col-12 col-md-8 col-xl-4" key={expenseCategory.categoryId}>
        <Accordion.Button className="border rounded-2 p-2 shadow-sm">
          <div className="col-6 px-0 d-flex align-items-center gap-2">
            <i
              className={`${category.icon} ${styles.expense__icon}`}
              style={{ backgroundColor: category.color }}
            />
            <span>{category.title}</span>
          </div>

          <div className="col-2 px-0 text-center">
            <small className="fw-bold text-success">{expenseCategory.percentage}%</small>
          </div>

          <div
            className="col-4 px-0 text-end overflow-hidden fs__small"
            style={{ textOverflow: 'ellipsis' }}
          >
            <span className="fw-bold text-muted text-end">
              {getCurrencyString(expenseCategory.totalAmount)}
            </span>
          </div>
        </Accordion.Button>

        <Accordion.Body className="border p-1 shadow-sm">
          <div className="text-white rounded-2" style={{ backgroundColor: category.color }}>
            {expenseCategory.subcategories &&
              expenseCategory.subcategories.length > 0 &&
              expenseCategory.subcategories.map((subcategory) => (
                <V2Subcategory {...{ subcategory }} key={subcategory.subcategoryId} />
              ))}
          </div>

          <V2ExpensesList expenses={expenseCategory.expenses} />
        </Accordion.Body>
      </Accordion>
    )
  );
};

export default ExpensesCategoryItem;
