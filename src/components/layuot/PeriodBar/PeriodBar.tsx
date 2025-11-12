import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { BsCalendar2Date } from 'react-icons/bs';

import type { TActivePeriod } from '../../../types/expenses.types.ts';

import { ROUTES } from '../../../routes/routes.ts';
import { expensesStore } from '../../../store/ExpensesStore.ts';
import { screenStore } from '../../../store/ScreenStore.ts';

import AppCalendar from '../../helpers/AppCalendar/AppCalendar.tsx';

import styles from './PeriodBar.module.css';

const PeriodBar = observer(() => {
  const { activePeriod, periodDate } = expensesStore;
  const { isMobile } = screenStore;

  const handleDayClick = (type: TActivePeriod) => {
    if (!activePeriod || activePeriod !== type) {
      expensesStore.setActivePeriod(type);
    } else {
      expensesStore.setActivePeriod(null);
    }
  };

  const handleCalendarClick = (value: Date | null) => {
    expensesStore.setPeriodDate(value);
    expensesStore.setActivePeriod('calendar');
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
        <Dropdown className="w-25">
          <Dropdown.Toggle
            variant="primary"
            className="w-100 rounded-0 btn-solid-blue py-2 fw-bold rounded-end-5 d-flex align-items-center justify-content-center"
            active={!!periodDate && activePeriod === 'calendar'}
          >
            {!isMobile && <span>Календарь</span>}
            {isMobile && <BsCalendar2Date size={24} />}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '300px' }}>
            <AppCalendar value={periodDate} onChange={handleCalendarClick} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
});

export default PeriodBar;
