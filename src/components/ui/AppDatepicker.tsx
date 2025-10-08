import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CiCalendarDate } from 'react-icons/ci';

import { ru } from 'date-fns/locale';

const AppDatepicker = ({ onChange }: { value: any; onChange: any }) => {
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value]);

  return (
    <Dropdown>
      <Dropdown.Toggle className="p-0 border-0 d-flex justify-content-center align-items-center rounded-1 bg-transparent text-dark">
        <CiCalendarDate size={40} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <DateCalendar
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppDatepicker;
