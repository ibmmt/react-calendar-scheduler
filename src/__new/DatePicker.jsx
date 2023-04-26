import React, { useState } from 'react';
//import './CustomDatePicker.css';

function CustomDatePicker() {
  let [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleInputChange = event => {
    const { value } = event.target;
    setSelectedDate(value);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDayClick = day => {
    setSelectedDate(day);
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const date = new Date();
    if (!selectedDate) {
      selectedDate = date.toISOString().substring(0, 10);
    }
    date.setFullYear(selectedDate.substring(0, 4));
    date.setMonth(selectedDate.substring(5, 7) - 1);
    date.setDate(selectedDate.substring(8, 10));

    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    const monthDays = [];
    let dayCounter = 1;

    for (let i = 1; i <= 6; i++) {
      const week = [];
      for (let j = 1; j <= 7; j++) {
        if (dayCounter <= daysInMonth) {
          const day = new Date(date.getFullYear(), date.getMonth(), dayCounter);
          week.push(
            <div
              className={`day ${
                selectedDate === day.toISOString().substring(0, 10)
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleDayClick(day.toISOString().substring(0, 10))}
              key={day.toISOString().substring(0, 10)}
            >
              {dayCounter}
            </div>,
          );
          dayCounter++;
        } else {
          week.push(<div className="day empty" key={`${i}-${j}`}></div>);
        }
      }
      monthDays.push(
        <div className="week" key={`week-${i}`}>
          {week}
        </div>,
      );
    }

    return (
      <div className="calendar">
        <div className="month">
          <div
            className="arrow"
            onClick={() =>
              setSelectedDate(
                `${date.getFullYear()}-${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}-${date
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`,
              )
            }
          >
            &lt;
          </div>
          <div className="name">
            {date.toLocaleString('default', { month: 'long' })}{' '}
            {date.getFullYear()}
          </div>
          <div
            className="arrow"
            onClick={() =>
              setSelectedDate(
                `${date.getFullYear()}-${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}-${date
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`,
              )
            }
          >
            &gt;
          </div>
        </div>
        <div className="days">
          <div className="day">Su</div>
          <div className="day">Mo</div>
          <div className="day">Tu</div>
          <div className="day">We</div>
          <div className="day">Th</div>
          <div className="day">Fr</div>
          <div className="day">Sa</div>
        </div>
        {monthDays}
      </div>
    );
  };

  return (
    <div className="custom-datepicker">
      <input
        type="date"
        placeholder="yyyy-mm-dd"
        value={selectedDate}
        onChange={handleInputChange}
        onFocus={toggleCalendar}
        onBlur={() => setTimeout(() => setShowCalendar(false), 200)}
      />
      {showCalendar && renderCalendar()}
      <style>{`
    .custom-datepicker {
      position: relative;
    }
    input {
      width: 100%;
      height: 2rem;
      padding: 0.25rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .calendar {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      z-index: 10000;
    }
    .month {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .arrow {
      cursor: pointer;
    }
    .name {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .days {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .day {
      width: calc(100% / 7);
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .day.selected {
      background-color: #007bff;
      color: #fff;
    }
    .day.empty {
      visibility: hidden;
    }
    .week {
      display: flex;
      justify-content: space-between;
    }
  `}</style>
    </div>
  );
}

export default CustomDatePicker;
