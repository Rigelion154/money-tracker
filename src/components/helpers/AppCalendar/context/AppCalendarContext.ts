import React from 'react';
import moment from 'moment';

interface ICalendarContext {
  momentValue: moment.Moment;
  setMomentValue: React.Dispatch<React.SetStateAction<moment.Moment>>;
  value: Date | null;
  onChange: (value: Date | null) => void;
  calendar: moment.Moment[];
}

export const AppCalendarContext = React.createContext<ICalendarContext>({
  momentValue: moment(),
  setMomentValue: () => {},
  value: null,
  onChange: () => {},
  calendar: [],
});
