import moment from 'moment';

import type { IExpense } from '../../types/expenses.types.ts';

import { DIVIDER_DATE_FORMAT } from '../../utils/constants.ts';

import V2Expense from './V2Expense.tsx';

const V2ExpensesList = ({ expenses }: { expenses: Record<string, IExpense[]> }) => {
  return Object.entries(expenses).map(([date, expenses]) => (
    <div key={date}>
      <div className="d-flex align-items-center lh-lg">
        <div className="flex-grow-1 bg-secondary-subtle" style={{ height: '1px' }} />
        <small className="px-2 text-muted">{moment(date).format(DIVIDER_DATE_FORMAT)}</small>
        <div className="flex-grow-1 bg-secondary-subtle" style={{ height: '1px' }} />
      </div>

      {expenses.map((expense) => (
        <V2Expense {...{ expense }} key={expense.id} />
      ))}
    </div>
  ));
};

export default V2ExpensesList;
