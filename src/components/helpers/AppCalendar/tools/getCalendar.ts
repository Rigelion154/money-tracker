import moment from 'moment/moment';

export const getCalendar = (momentValue: moment.Moment) => {
  const calendar = [];
  const firstMonthDay = momentValue.clone().startOf('month'); // Ищем начало месяца
  const firstMonthDayIndex = firstMonthDay.clone().weekday(); // Ищем индекс начала месяца в неделе
  // Смещаем начало календаря на индекс, чтобы начать с понедельника
  const startOfCalendar = firstMonthDay.clone().add(-firstMonthDayIndex - 1, 'day');

  for (let i = 1; i <= 42; i++) {
    calendar.push(startOfCalendar.add(1, 'day').clone());
  }

  return calendar;
};