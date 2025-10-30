import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { ROUTES } from '../../../routes/routes.ts';
import { expensesStore } from '../../../store/ExpensesStore.ts';

import styles from './PeriodBar.module.css';
import type { TActivePeriod } from '../../../types/expenses.types.ts';

const PeriodBar = observer(() => {
  const { activePeriod } = expensesStore;

  const handleDayClick = (type: TActivePeriod) => {
    if (!activePeriod || activePeriod !== type) {
      expensesStore.setActivePeriod(type);
    } else {
      expensesStore.setActivePeriod(null);
    }
  };

  return (
    <div className={`${styles.bar__container} border-bottom`}>
      <div className={styles.add__button_container}>
        <Link to={ROUTES.ADD_TRANSACTION} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button variant="warning" className={styles.add__button}>
            <i className="bi bi-plus fs-4 text-dark"></i>
          </Button>
        </Link>
      </div>

      <div
        className="d-flex align-items-center justify-content-center w-100 position-relative"
        style={{ height: '40px' }}
      >
        <Button
          variant="primary"
          className="rounded-0 btn-solid-blue border-end flex-fill w-25 py-2 fw-bold rounded-start-5"
          onClick={() => handleDayClick('day')}
          active={activePeriod === 'day'}
        >
          День
        </Button>
        <Button
          variant="primary"
          className="rounded-0 btn-solid-blue border-end flex-fill w-25 py-2 fw-bold"
          onClick={() => handleDayClick('month')}
          active={activePeriod === 'month'}
        >
          Месяц
        </Button>
        <Button
          variant="primary"
          className="rounded-0 btn-solid-blue border-end flex-fill w-25 py-2 fw-bold"
          onClick={() => handleDayClick('year')}
          active={activePeriod === 'year'}
        >
          Год
        </Button>
        <Button
          variant="primary"
          className="rounded-0 btn-solid-blue  flex-fill w-25 py-2 fw-bold rounded-end-5"
        >
          Период
        </Button>
      </div>
    </div>
  );
});

export default PeriodBar;
