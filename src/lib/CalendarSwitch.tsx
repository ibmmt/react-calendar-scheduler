//import React  from 'react';
import React from 'react';
import { CalenderType } from './type/Calendar';

interface CalendarSwitchProps {
  calendarType: CalenderType
  calendarViewOptions?: CalenderType[];
  onCalendarTypeChange: (type: CalenderType) => void;
}

export default function CalendarSwitch({
  calendarType,
  calendarViewOptions,
  onCalendarTypeChange,
}: CalendarSwitchProps) {

  return (
    <React.Fragment>
    <div className="ib__sc__btn-group ib__sc__calendar_switch">
      {calendarViewOptions?.map((type, index) => (
        <button
          key={index}
          className={
            'ib__sc__btn ib_sc_btn_' +
            type.toLowerCase() +
            ' ' +
            (calendarType === type ? 'active' : '')
          }
          onClick={() => onCalendarTypeChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
      {/* <button
        className={
          'ib__sc__btn ib_sc_btn_month ' +
          (calendarType === 'month' ? 'active' : '')
        }
        onClick={() => onCalendarTypeChange('month')}
      >
        Month
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_week ' +
          (calendarType === 'week' ? 'active' : '')
        }
        onClick={() => onCalendarTypeChange('week')}
      >
        Week
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_team ' +
          (calendarType === 'team' ? 'active' : '')
        }
        onClick={() => onCalendarTypeChange('team')}
      >
        Team
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_day ' +
          (calendarType === 'day' ? 'active' : '')
        }
        onClick={() => onCalendarTypeChange('day')}
      >
        Day
      </button> */}
    </div>
    </React.Fragment>
  );
}
