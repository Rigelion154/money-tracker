import { Dropdown } from 'react-bootstrap';
import { CiCalendarDate } from 'react-icons/ci';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

addLocale('ru', {
  firstDayOfWeek: 1,
  dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ],
  now: 'Сегодня',
  clear: 'Очистить',
  weekHeader: 'Нед',
});

const AppDatepicker = ({ value, onChange }: { value: any; onChange: any }) => {
  // const [value, setValue] = useState<any>(null);

  // useEffect(() => {
  //   onChange(value);
  // }, [value]);

  return (
    <Dropdown>
      <Dropdown.Toggle className="p-0 border-0 d-flex justify-content-center align-items-center rounded-1 bg-transparent text-dark">
        <CiCalendarDate size={40} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0">
        <Calendar
          value={value}
          onChange={(e) => onChange(e.value)}
          showTime
          hourFormat="24"
          inline
          showButtonBar
          locale="ru"
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppDatepicker;
