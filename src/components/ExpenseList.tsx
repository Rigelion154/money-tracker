import moment from 'moment/moment';
import { observer } from 'mobx-react-lite';
import { Accordion } from 'react-bootstrap';

import { getCurrencyString } from '../utils/getCurrencyString.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

const ExpenseList = observer(() => {
  const { totalAmountCategoryList } = categoriesStore;

  return (
    <div className="row flex-column align-items-center gap-2">
      {totalAmountCategoryList.map((item) => {
        return (
          <div className="col-12 col-md-8 col-xl-4" key={item.category.id}>
            <Accordion>
              <Accordion.Button className="border rounded-2 p-2 shadow-sm">
                <i
                  className={`${item.category.icon} rounded-circle py-1 px-2 text-white`}
                  style={{ backgroundColor: item.category.color }}
                />
                <div className="w-100 d-flex align-items-center justify-content-between px-2">
                  <span>{item.category.title}</span>
                  <span className="fw-bold text-muted">{getCurrencyString(item.totalAmount)}</span>
                </div>
              </Accordion.Button>

              <Accordion.Body className="d-flex flex-column gap-2 p-2 bg-light border roudned-2 shadow-sm">
                {item.expenses.map((expense) => (
                  <div
                    className="bg-white py-1 px-2 rounded-1 d-flex align-items-center gap-2"
                    key={expense.id}
                  >
                    <span style={{ color: item.category.color }}>
                      {expense.subcategory_id ? expense.subcategories.title : item.category.title}
                    </span>
                    <small>{moment.utc(expense.date).format('DD.MM.YYYY HH:mm')}</small>
                    <span className="ms-auto">{getCurrencyString(expense.amount)}</span>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
});

export default ExpenseList;
