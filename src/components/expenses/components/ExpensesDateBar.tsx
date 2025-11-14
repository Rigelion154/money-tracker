import moment from 'moment/moment';
import { observer } from 'mobx-react-lite';

import { expensesStore } from '../../../store/ExpensesStore.ts';

const ExpensesDateBar = observer(() => {
  const { periodDate } = expensesStore;

  return (
    periodDate && (
      <h4 className="fw-bold text-capitalize text-primary">
        {moment(periodDate).format('DD MMMM YYYY')}
      </h4>
    )
  );
});

export default ExpensesDateBar;