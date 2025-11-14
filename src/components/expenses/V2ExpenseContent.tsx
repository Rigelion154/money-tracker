import { Accordion } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';

import ExpensesTotalBar from './total/ExpensesTotalBar.tsx';
import V2ExpensesList from './V2ExpensesList.tsx';
import V2Subcategory from './V2Subcategory.tsx';

import styles from './Expenses.module.css';

const V2ExpenseContent = observer(() => {
  const { v2expenses, periodDate } = expensesStore;
  const { v2_categories } = categoriesStore;

  return (
    <>
      {v2_categories && v2expenses.length > 0 && (
        <div className="w-100 d-flex flex-column align-items-center gap-2">
          {periodDate && (
            <h4 className="fw-bold text-capitalize text-primary">
              {moment(periodDate).format('DD MMMM YYYY')}
            </h4>
          )}

          <ExpensesTotalBar />

          {v2expenses.map((expenseCategory) => {
            const category = v2_categories[expenseCategory.categoryId];

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
                    <div
                      className="text-white rounded-2"
                      style={{ backgroundColor: category.color }}
                    >
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
          })}
        </div>
      )}
    </>
  );
});

export default V2ExpenseContent;
