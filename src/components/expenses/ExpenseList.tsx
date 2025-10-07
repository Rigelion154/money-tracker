import { observer } from 'mobx-react-lite';
import { Accordion, Card } from 'react-bootstrap';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { calculatePercentage } from '../../utils/calculatePersentage.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';

import styles from './Expenses.module.css';

const ExpenseList = observer(() => {
  const { totalAmount, expenses } = expensesStore;

  const handleExpenseClick = async (id: string) => {
    modalStore.openModal({ children: <ExpenseDetailsModal id={id} /> });
  };

  return (
    <div className="row flex-column justify-content-center align-items-center gap-2">
      <Card className="col-10 col-md-7 col-xl-3 mb-3 rounded-4 text-white gradient-animated-purple">
        <Card.Body className="d-flex align-items-center justify-content-between gap-3">
          <span className="mb-0">Общий расход</span>
          <span>{getCurrencyString(totalAmount)}</span>
        </Card.Body>
      </Card>

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

            <Accordion.Body
              className="d-flex flex-column gap-2 py-2 px-0 bg-light border roudned-2 shadow-sm"
              style={{ fontSize: '.8rem' }}
            >
              <>
                {category?.subcategories.map(
                  (subcategory) =>
                    subcategory.expenses.length > 1 && (
                      <Accordion key={subcategory.id}>
                        <Accordion.Button
                          className="border rounded-0 py-1 p-2 shadow-none"
                          style={{ fontSize: '.8rem' }}
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
                        </Accordion.Button>
                        <Accordion.Body className="d-flex flex-column gap-2 py-2 px-0 bg-light border roudned-2 shadow-sm">
                          {subcategory.expenses.map((expense) => (
                            <div
                              className={styles.expense__list_wrapper}
                              key={expense.id + expense.subcategory_id}
                              onClick={() => handleExpenseClick(expense.id)}
                            >
                              <span style={{ color: category.color }}>{subcategory.title}</span>
                              <small className="fw-bold text-primary">
                                {calculatePercentage(
                                  category.category_total_amount,
                                  expense.amount,
                                )}
                                %
                              </small>
                              <span className="ms-auto">{getCurrencyString(expense.amount)}</span>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion>
                    ),
                )}
              </>
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
