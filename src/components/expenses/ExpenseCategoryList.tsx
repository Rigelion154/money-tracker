import { observer } from 'mobx-react-lite';
import { Accordion } from 'react-bootstrap';

import { expensesStore } from '../../store/ExpensesStore.ts';
import { modalStore } from '../../store/ModalStore.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import { calculatePercentage } from '../../utils/calculatePersentage.ts';

import ExpenseDetailsModal from './ExpenseDetailsModal.tsx';
import ExpensesTotalBar from './ExpensesTotalBar.tsx';
import ExpenseSubcategoryList from './ExpenseSubcategoryList.tsx';
import ExpenseList from './ExpenseList.tsx';

const ExpenseCategoryList = observer(() => {
  const { totalAmount, expenses } = expensesStore;

  const handleExpenseClick = async (id: string) => {
    modalStore.openModal({ children: <ExpenseDetailsModal id={id} /> });
  };

  return (
    <div className="row flex-column justify-content-center align-items-center gap-2">
      <ExpensesTotalBar />

      {expenses.map((category) => {
        return (
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

              <Accordion.Body className="border p-1 shadow-sm">
                <ExpenseSubcategoryList {...{ category, handleExpenseClick }} />
                <ExpenseList {...{ category, handleExpenseClick }} />
              </Accordion.Body>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
});

export default ExpenseCategoryList;
