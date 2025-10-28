import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { authStore } from '../../store/AuthStore.ts';

import BaseLoader from '../../components/helpers/BaseLoader.tsx';
import PeriodBar from '../../components/layuot/PeriodBar/PeriodBar.tsx';
import { categoriesStore } from '../../store/CategoriesStore.ts';
import { Accordion } from 'react-bootstrap';
import styles from '../../components/expenses/Expenses.module.css';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { subcategoriesStore } from '../../store/SubcategoriesStore.ts';

const MainPage = observer(() => {
  const { userId } = authStore;
  const { activePeriod, v2expenses } = expensesStore;
  const { v2_categories } = categoriesStore;
  const { subcategories } = subcategoriesStore;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startDate = activePeriod && moment().startOf(activePeriod).format('YYYY-MM-DD');
    const endDate = activePeriod && moment().endOf(activePeriod).format('YYYY-MM-DD');

    if (userId) {
      expensesStore.getUserExpenses(userId, startDate, endDate).finally(() => setIsLoading(false));
      expensesStore.getV2Expenses().finally(() => setIsLoading(false));
    }
  }, [userId, activePeriod]);

  useEffect(() => {
    subcategoriesStore.getV2Subcategories().finally(() => setIsLoading(false));
    categoriesStore.getV2Categories().finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="w-100 py-3 pb-5">
      {isLoading && <BaseLoader />}
      {!isLoading && (
        <>
          {v2_categories && v2expenses && subcategories && (
            <div className="w-100 d-flex flex-column align-items-center gap-2">
              {v2expenses.map((expenseCategory) => {
                const category = v2_categories[expenseCategory.categoryId];
                return (
                  <Accordion className="col-12 col-md-8 col-xl-4">
                    <Accordion.Button className="border rounded-2 p-2 shadow-sm">
                      <div className="col-6 px-0 d-flex align-items-center gap-2">
                        <i
                          className={`${category.icon} ${styles.expense__icon}`}
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.title}</span>
                      </div>

                      <div className="col-2 px-0 text-center">
                        <small className="fw-bold text-success">{11}%</small>
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
                          expenseCategory.subcategories.map((subcategory) => (
                            <div className="px-2" role="button">
                              {subcategories[subcategory.subcategoryId].title}
                            </div>
                          ))}
                      </div>

                      {Object.entries(expenseCategory.expenses).map(([date, expenses]) => (
                        <>
                          <div className="d-flex align-items-center lh-lg">
                            <div
                              className="flex-grow-1 bg-secondary-subtle"
                              style={{ height: '1px' }}
                            />
                            <small className="px-2 text-muted">
                              {moment(date).format('DD MMMM YYYY')}
                            </small>
                            <div
                              className="flex-grow-1 bg-secondary-subtle"
                              style={{ height: '1px' }}
                            />
                          </div>

                          {expenses.map((expense) => (
                            <div
                              className={styles.expense__list_wrapper}
                              key={expense.id + expense.category_id}
                              // onClick={() => handleExpenseClick(expense.id)}
                            >
                              <span style={{ color: category.color }}>
                                {expense.subcategory_id
                                  ? subcategories[expense.subcategory_id].title
                                  : category.title}
                              </span>

                              <span className="text-end">{getCurrencyString(expense.amount)}</span>
                            </div>
                          ))}
                        </>
                      ))}
                      {/*<ExpenseSubcategoryList {...{ category }} />*/}
                      {/*<ExpenseList {...{ category, expenses: category.expenses, type: 'category' }} />*/}
                    </Accordion.Body>
                  </Accordion>
                );
              })}
            </div>
          )}

          {/*<ExpenseCategoryList />*/}
          <PeriodBar />
        </>
      )}
    </div>
  );
});

export default MainPage;
