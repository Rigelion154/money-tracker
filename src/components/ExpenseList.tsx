import moment from 'moment/moment';
import { Accordion } from 'react-bootstrap';
import { getCurrencyString } from '../utils/getCurrencyString.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';
import { observer } from 'mobx-react-lite';

const ExpenseList = observer(() => {
  const { expenses } = categoriesStore;

  return (
    <div className="container-fluid">
      <div className="row flex-column align-items-center gap-2">
        {expenses &&
          Object.keys(expenses).length > 0 &&
          Object.keys(expenses).map((categoryId) => {
            const expenseObj = expenses[categoryId];

            return (
              <div className="col-12 col-md-8 col-xl-4" key={categoryId}>
                <Accordion>
                  <Accordion.Button className="border rounded-2 p-2 shadow-sm">
                    <i
                      className={`${expenseObj.category.icon} rounded-circle py-1 px-2 text-white`}
                      style={{
                        backgroundColor: expenseObj.category.color,
                      }}
                    />
                    <div className="w-100 d-flex align-items-center justify-content-between px-2">
                      <span>{expenseObj.category.title}</span>
                      <span className="fw-bold text-muted">
                        {getCurrencyString(expenses[categoryId].totalAmount)}
                      </span>
                    </div>
                  </Accordion.Button>

                  <Accordion.Body className="d-flex flex-column gap-2 p-2 bg-light border roudned-2 shadow-sm">
                    {expenseObj.items.map((expense) => (
                      <div
                        className="bg-white py-1 px-2 rounded-1 d-flex align-items-center gap-2"
                        key={expense.id}
                      >
                        <span style={{ color: expenseObj.category.color }}>
                          {expense.subcategory_id
                            ? expense.subcategories.title
                            : expenseObj.category.title}
                        </span>
                        <small>
                          {moment.utc(expense.date).format('DD.MM.YYYY HH:mm')}
                        </small>
                        <span className="ms-auto">
                          {getCurrencyString(expense.amount)}
                        </span>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default ExpenseList;
