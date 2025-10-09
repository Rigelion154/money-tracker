import { Accordion } from 'react-bootstrap';
import { calculatePercentage } from '../../utils/calculatePersentage.ts';
import { getCurrencyString } from '../../utils/getCurrencyString.ts';
import ExpenseSubcategoryList from './ExpenseSubcategoryList.tsx';
import ExpenseList from './ExpenseList.tsx';
import type { IExpenseCategory } from '../../types/expenses.types.ts';

interface CategoryItemProps {
  category: IExpenseCategory;
  totalAmount: number;
  handleExpenseClick: () => (id: string) => Promise<void>;
}

const ExpenseCategoryItem = ({ category, totalAmount, handleExpenseClick }: CategoryItemProps) => {
  const percentage = calculatePercentage(totalAmount, category.category_total_amount);
  const currencyString = getCurrencyString(category.category_total_amount);

  return (
    <Accordion className="col-12 col-md-8 col-xl-4">
      <Accordion.Item eventKey={category.id} className="border-0">
        <Accordion.Button className="border rounded-2 p-2 shadow-sm">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-6 px-0 d-flex align-items-center gap-2">
                <i
                  className={`${category.icon} rounded-circle text-white align-items-center justify-content-center`}
                  style={{
                    backgroundColor: category.color,
                    width: '30px',
                    height: '30px',
                    display: 'inline-flex',
                  }}
                />
                <span>{category.title}</span>
              </div>

              <div className="col-2 px-0 text-center">
                <small className="fw-bold text-success">{percentage}%</small>
              </div>

              <div
                className="col-4 px-0 text-end"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '.8rem' }}
              >
                <span className="fw-bold text-muted text-end">{currencyString}</span>
              </div>
            </div>
          </div>
        </Accordion.Button>

        <Accordion.Body className="border p-1 shadow-sm">
          <ExpenseSubcategoryList {...{ category, handleExpenseClick }} />
          <ExpenseList {...{ category, handleExpenseClick }} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ExpenseCategoryItem;