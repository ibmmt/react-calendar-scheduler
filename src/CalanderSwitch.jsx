import React from 'react';

export default function CalanderSwitch({
  calanderType,
  handleClanderTypeChange,
}) {
  return (
    <div className="ib__sc__btn-group">
      <button
        className={
          'ib__sc__btn ib_sc_btn_month ' +
          (calanderType === 'month' ? 'active' : '')
        }
        onClick={() => handleClanderTypeChange('month')}
      >
        Month
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_week ' +
          (calanderType === 'week' ? 'active' : '')
        }
        onClick={() => handleClanderTypeChange('week')}
      >
        Week{' '}
      </button>
      <button
        className={
          'ib__sc__btn ib_sc_btn_day ' +
          (calanderType === 'day' ? 'active' : '')
        }
        onClick={() => handleClanderTypeChange('day')}
      >
        Day
      </button>
    </div>
  );
}
