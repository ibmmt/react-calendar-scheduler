//import React  from 'react';
import React from 'react';
interface CalendarSwitchProps {
  calenderType: string;
  handleClanderTypeChange: (type: string) => void;
}

export default function CalendarSwitch({
  calenderType,
  handleClanderTypeChange,
}: CalendarSwitchProps) {
  return (
    <React.Fragment>
    <div className="ib__sc__btn-group ib__sc__calander_switch">
      <button
        className={
          'ib__sc__btn ib_sc_btn_month ' +
          (calenderType === 'month' ? 'active' : '')
        }
        onClick={() => handleClanderTypeChange('month')}
      >
        Month
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_week ' +
          (calenderType === 'week' ? 'active' : '')
        }
        onClick={() => handleClanderTypeChange('week')}
      >
        Week
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_day ' +
          (calenderType === 'day' ? 'active' : '')
        }
        onClick={() => handleClanderTypeChange('day')}
      >
        Day
      </button>
    </div>
    </React.Fragment>
  );
}
