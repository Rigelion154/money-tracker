import Calendar from './components';

export interface ICalendarProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

const AppCalendar = ({ value, onChange }: ICalendarProps) => (
  <Calendar.Provider {...{ value, onChange }}>
    <Calendar.Wrapper>
      <Calendar.Header />
      <div>
        <Calendar.DaysBar />
        <Calendar.CellList />
      </div>
      <Calendar.Footer />
    </Calendar.Wrapper>
  </Calendar.Provider>
);

export default AppCalendar;