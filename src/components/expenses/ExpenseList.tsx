import { observer } from 'mobx-react-lite';
import { Accordion } from 'react-bootstrap';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { calculatePercentage } from '../../utils/calculatePersentage.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';
import ExpensesTotalBar from './ExpensesTotalBar.tsx';

import styles from './Expenses.module.css';
import ExpenseSubcategoryList from './ExpenseSubcategoryList.tsx';

const ExpenseList = observer(() => {
  const { totalAmount, expenses } = expensesStore;

  const handleExpenseClick = async (id: string) => {
    modalStore.openModal({ children: <ExpenseDetailsModal id={id} /> });
  };

  return (
    <div className="row flex-column justify-content-center align-items-center gap-2">
      <ExpensesTotalBar />

      {expenses.map((category) => (
        <div className="col-12 col-md-8 col-xl-4" key={category.id}>
          <Accordion>
            <Accordion.Button className="border rounded-2 p-2 shadow-sm">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-6 px-0">
                    <i
                      className={`${category.icon} rounded-circle py-1 px-2 text-white me-2`}
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.title}</span>
                  </div>

                  <div className="col-2 px-0 text-center">
                    <small className="fw-bold text-success">
                      {calculatePercentage(totalAmount, category.category_total_amount)}%
                    </small>
                  </div>

                  <div
                    className="col-4 px-0 text-end"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '.8rem' }}
                  >
                    <span className="fw-bold text-muted text-end">
                      {getCurrencyString(category.category_total_amount)}
                    </span>
                  </div>
                </div>
              </div>
            </Accordion.Button>

            <Accordion.Body className="d-flex flex-column gap-2 py-2 px-0 bg-white border roudned-2 shadow-sm">
              <div className="rounded-3 overflow-hidden">
                {category?.subcategories.map(
                  (subcategory) =>
                    subcategory.expenses.length > 1 && (
                      <ExpenseSubcategoryList {...{ category, subcategory, handleExpenseClick }} />
                    ),
                )}
              </div>
              {category.expenses.map((expense) => (
                <div
                  className={styles.expense__list_wrapper}
                  key={expense.id + expense.category_id}
                  onClick={() => handleExpenseClick(expense.id)}
                >
                  <span style={{ color: category.color }}>
                    {expense.subcategory_id
                      ? category?.subcategories?.find(
                          (subcategory) => subcategory.id === expense.subcategory_id,
                        )?.title
                      : category.title}
                  </span>
                  <small className="fw-bold text-primary">
                    {calculatePercentage(category.category_total_amount, expense.amount)}%
                  </small>
                  <span className="ms-auto">{getCurrencyString(expense.amount)}</span>
                </div>
              ))}
            </Accordion.Body>
          </Accordion>
        </div>
      ))}
    </div>
  );
});

export default ExpenseList;
