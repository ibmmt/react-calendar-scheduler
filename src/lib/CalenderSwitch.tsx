//import React  from 'react';
import React from 'react';
import { CalenderType } from './type/Calendar';

interface CalendarSwitchProps {
  calenderType: CalenderType
  calendarSwitchOptions?: CalenderType[];
  handleCalendarTypeChange: (type: CalenderType) => void;
}

export default function CalendarSwitch({
  calenderType,
  calendarSwitchOptions,
  handleCalendarTypeChange,
}: CalendarSwitchProps) {

  return (
    <React.Fragment>
    <div className="ib__sc__btn-group ib__sc__calender_switch">
      {calendarSwitchOptions?.map((type, index) => (
        <button
          key={index}
          className={
            'ib__sc__btn ib_sc_btn_' +
            type.toLowerCase() +
            ' ' +
            (calenderType === type ? 'active' : '')
          }
          onClick={() => handleCalendarTypeChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
      {/* <button
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
          'ib__sc__btn ib_sc_btn_team ' +
          (calenderType === 'team' ? 'active' : '')
        }
        onClick={() => handleCalendarTypeChange('team')}
      >
        Team
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_day ' +
          (calenderType === 'day' ? 'active' : '')
        }
        onClick={() => handleCalendarTypeChange('day')}
      >
        Day
      </button> */}
    </div>
    </React.Fragment>
  );
}
