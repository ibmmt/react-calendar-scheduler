//import React  from 'react';
import React from 'react';
interface CalendarSwitchProps {
  calenderType: string;
  handleCalendarTypeChange: (type: string) => void;
}

export default function CalendarSwitch({
  calenderType,
  handleCalendarTypeChange,
}: CalendarSwitchProps) {
  return (
    <React.Fragment>
    <div className="ib__sc__btn-group ib__sc__calender_switch">
      <button
        className={
          'ib__sc__btn ib_sc_btn_month ' +
          (calenderType === 'month' ? 'active' : '')
        }
        onClick={() => handleCalendarTypeChange('month')}
      >
        Month
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_week ' +
          (calenderType === 'week' ? 'active' : '')
        }
        onClick={() => handleCalendarTypeChange('week')}
      >
        Week
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_day ' +
          (calenderType === 'day' ? 'active' : '')
        }
        onClick={() => handleCalendarTypeChange('day')}
      >
        Day
      </button>
    </div>
    </React.Fragment>
  );
}
