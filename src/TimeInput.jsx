import React, { useState } from 'react';

function TimeInput({ onChange, value }) {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  function convertTime(timeString) {
    timeString = timeString.toUpperCase();

    timeString = timeString.toString().replace(/\s+/g, '');

    if (/\d{1,2}:\d{2}\s(AM|PM)/.test(timeString)) {
      return timeString.toUpperCase();
    }

    // Split the input string into hour and minute components
    let hour = parseInt(timeString.substring(0, 2));
    let minute = parseInt(timeString.substring(2, 4) || '0');
    let meridiem = timeString.includes('PM') ? 'PM' : 'AM';

    // Determine the appropriate meridiem based on the hour value
    if (hour >= 12) {
      meridiem = 'PM';
    }

    // Convert hour to 12-hour format and handle special cases for 0 and 12
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }
    if (isNaN(minute)) {
      minute = 0;
    }
    if (isNaN(hour)) {
      hour = 0;
    }

    if (hour > 24) {
      hour = 24;
    }

    if (minute > 59) {
      minute = 0;
    }

    let outputString =
      hour.toString().padStart(2, '0') +
      ':' +
      minute.toString().padStart(2, '0') +
      ' ' +
      meridiem;
    onChange(outputString);

    return outputString;
  }

  function handleBlur() {
    const formattedValue = convertTime(inputValue);
    setIsValid(formattedValue.length === 8);
    setInputValue(formattedValue);
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <input
        type={isEditing ? 'text' : 'time'}
        id="time-input"
        name="time"
        className="ib__sc-form-control"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
      />
      {!isValid && <div className="error">Invalid time format</div>}
    </div>
  );
}

export default TimeInput;
