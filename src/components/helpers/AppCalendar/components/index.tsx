import styles from '../AppCalendar.module.scss';
import { getCalendar } from '../tools/getCalendar.ts';
import moment from 'moment';
import { CALENDAR_DATE_FORMAT, CALENDAR_WEEK_DAYS } from '../constants.ts';
import React from 'react';
import type { ICalendarProps } from '../AppCalendar.tsx';
import { Button, Dropdown } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ICellProps extends ICalendarProps {
  day: moment.Moment;
  momentValue: moment.Moment;
}

interface IListProps extends ICalendarProps {
  momentValue: moment.Moment;
}

interface IHeaderProps {
  momentValue: moment.Moment;
  setMomentValue: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

interface IFooterProps {
  onChange: (value: Date | null) => void;
  handleClose: () => void;
}

const CalendarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.calendar__wrapper}>{children}</div>
);

const Header = ({ momentValue, setMomentValue }: IHeaderProps) => {
  const handleChangeMonth = (type: 'increase' | 'decrease') => {
    const newValue = momentValue
      .clone()
      .add(type === 'increase' ? 1 : -1, 'month')
      .startOf('month');

    setMomentValue(newValue);
  };

  return (
    <div className={styles.header}>
      <Button
        variant="outline-dark"
        className="border-0 px-2"
        onClick={() => handleChangeMonth('decrease')}
      >
        <FaChevronLeft />
      </Button>
      <div className="text-capitalize text-center fw-bold">{momentValue.format('MMMM YYYY')}</div>
      <Button
        variant="outline-dark"
        className="border-0 px-2"
        onClick={() => handleChangeMonth('increase')}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};

const DaysBar = () => (
  <div className={styles.days__wrapper}>
    {CALENDAR_WEEK_DAYS.map((day) => (
      <div className="text-center fw-bold" key={day}>
        {day}
      </div>
    ))}
  </div>
);

const CalendarList = ({ value, onChange, momentValue }: IListProps) => {
  const calendar = getCalendar(momentValue);

  return (
    <div className={styles.cell__wrapper}>
      {calendar.map((day) => (
        <Cell key={day.format(CALENDAR_DATE_FORMAT)} {...{ day, value, onChange, momentValue }} />
      ))}
    </div>
  );
};

const Cell = ({ day, value, onChange, momentValue }: ICellProps) => {
  const currentMonth = momentValue.month();
  const isCurrentMonth = day.month() === currentMonth;
  const isWeekend = day.day() === 0 || day.day() === 6;
  const isToday = day.isSame(moment(), 'day');
  const isSelected = day.isSame(moment(value), 'day');
  const cellColor = isSelected
    ? styles.calendar__cell_selected
    : !isCurrentMonth
      ? styles.calendar__cell_other
      : isWeekend
        ? styles.calendar__cell_weekend
        : isToday
          ? styles.calendar__cell_today
          : '';

  const handleCellClick = () => {
    const currentTime = moment();
    const selectedDateWithCurrentTime = day
      .set('hour', currentTime.hour())
      .set('minute', currentTime.minute())
      .set('second', currentTime.second());

    onChange(selectedDateWithCurrentTime.toDate());
  };

  return (
    <Dropdown.Item className={`${styles.calendar__cell} ${cellColor}`} onClick={handleCellClick}>
      {day.format('D')}
    </Dropdown.Item>
  );
};

const Footer = ({ onChange, handleClose }: IFooterProps) => {
  const handleSetToday = () => {
    onChange(moment().toDate());
    handleClose();
  };
  const handleReset = () => {
    onChange(null);
    handleClose();
  };

  return (
    <div className={styles.footer__wrapper}>
      <Button size="sm" onClick={handleSetToday}>
        <Dropdown.Item className="p-0" style={{ color: 'inherit' }}>
          Сегодня
        </Dropdown.Item>
      </Button>
      <Button size="sm" onClick={handleReset}>
        <Dropdown.Item className="p-0" style={{ color: 'inherit' }}>
          Сбросить
        </Dropdown.Item>
      </Button>
    </div>
  );
};

const Calendar = {
  Header,
  CalendarWrapper,
  DaysBar,
  CalendarList,
  Footer,
};

export default Calendar;
