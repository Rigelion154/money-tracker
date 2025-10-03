import { observer } from 'mobx-react-lite';
import { Accordion, Card } from 'react-bootstrap';

import { getCurrencyString } from '../utils/getCurrencyString.ts';
import { calculatePercentage } from '../utils/calculatePersentage.ts';
import { categoriesStore } from '../store/CategoriesStore.ts';

const ExpenseList = observer(() => {
  const { totalAmountCategoryList, totalAmount } = categoriesStore;

  return (
    <div className="row flex-column justify-content-center align-items-center gap-2">
      <Card className="col-10 col-md-7 col-xl-3 mb-3 rounded-4 text-white gradient-animated-purple">
        <Card.Body className="d-flex align-items-center justify-content-between gap-3">
          <span className="mb-0">Общий расход</span>
          <span>{getCurrencyString(totalAmount)}</span>
        </Card.Body>
      </Card>
      {totalAmountCategoryList.map((item) => {
        return (
          <div className="col-12 col-md-8 col-xl-4" key={item.category.id}>
            <Accordion>
              <Accordion.Button className="border rounded-2 p-2 shadow-sm">
                <i
                  className={`${item.category.icon} rounded-circle py-1 px-2 text-white`}
                  style={{ backgroundColor: item.category.color }}
                />
                {/*<div className="w-100 d-flex align-items-center justify-content-between px-2">*/}
                <div
                  className="w-100 px-2"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '5fr 1fr 3fr',
                    gap: '.5rem',
                  }}
                >
                  <span>{item.category.title}</span>
                  <small className="fw-bold text-success">
                    {calculatePercentage(totalAmount, item.totalAmount)}%
                  </small>
                  <span className="fw-bold text-muted text-end">
                    {getCurrencyString(item.totalAmount)}
                  </span>
                </div>
              </Accordion.Button>

              <Accordion.Body className="d-flex flex-column gap-2 p-2 bg-light border roudned-2 shadow-sm">
                {item.expenses.map((expense) => (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '5fr 1fr 3fr',
                      gap: '.5rem',
                    }}
                    key={expense.id}
                  >
                    <span style={{ color: item.category.color }}>
                      {expense.subcategory_id ? expense.subcategories.title : item.category.title}
                    </span>
                    <small className="fw-bold text-primary">
                      {calculatePercentage(item.totalAmount, expense.amount)}%
                    </small>
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
