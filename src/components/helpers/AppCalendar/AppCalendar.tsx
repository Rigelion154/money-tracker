import { Dropdown } from 'react-bootstrap';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import Calendar from './components';
import { useRef, useState } from 'react';
import moment from 'moment';

export interface ICalendarProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

const AppCalendar = ({ value, onChange }: ICalendarProps) => {
  const [momentValue, setMomentValue] = useState<moment.Moment>(moment());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    if (dropdownRef.current && menuRef.current && buttonRef.current) {
      dropdownRef.current.classList.remove('show');
      menuRef.current.classList.remove('show');
      buttonRef.current.classList.remove('show');
      buttonRef.current.setAttribute('aria-expanded', 'false');
      //   p-0 border-0 d-flex justify-content-center align-items-center rounded-3 p-1 dropdown-toggle btn btn-outline-success
      //     p-0 border-0 d-flex justify-content-center align-items-center rounded-3 p-1  dropdown-toggle btn btn-outline-success
    }
  };

  return (
    <Dropdown ref={dropdownRef}>
      <Dropdown.Toggle
        ref={buttonRef}
        variant="outline-success"
        className={`p-0 border-0 d-flex justify-content-center align-items-center rounded-3 p-1 ${value ? 'bg-success text-white' : ''}`}
      >
        <IoCalendarNumberOutline size={35} />
      </Dropdown.Toggle>
      <Dropdown.Menu
        className="p-0 border-0"
        style={{ minWidth: '300px', width: '100%' }}
        ref={menuRef}
      >
        <Calendar.CalendarWrapper>
          <Calendar.Header {...{ momentValue, setMomentValue }} />
          <div>
            <Calendar.DaysBar />
            <Calendar.CalendarList {...{ value, onChange, momentValue }} />
          </div>
          <Calendar.Footer {...{ onChange, handleClose }} />
        </Calendar.CalendarWrapper>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppCalendar;
