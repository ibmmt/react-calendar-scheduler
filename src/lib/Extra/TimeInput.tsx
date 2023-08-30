import React, { useEffect, useRef, useState } from 'react';
import { convertTo12Hour, convertTo24HourFormat } from '../../lib/_utils';
import './TimeInput.css';

interface TimeInputProps {
  onChange: (value: string) => void;
  value: string;
}

function TimeInput({ onChange, value }: TimeInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>(formatTime(new Date()));
  const [dropdownValues, setDropdownValues] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = String(minutes).padStart(2, '0');
    return `${hours}:${minutesStr} ${ampm}`;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (value) {
      setInputValue(convertTo12Hour(value));
    }
  }, [value]);

  function handleInputBlur(): void {
    const inputStr = inputValue.replace(/[^\d]/g, '').toUpperCase();
    let hours = parseInt(inputStr.substr(0, 2), 10) || 0;
    let minutes = parseInt(inputStr.substr(2, 2), 10) || 0;
    const ampm = inputValue.toUpperCase().includes('P') ? 'PM' : 'AM';

    if (hours > 24) hours = hours % 10;
    if (minutes > 59) minutes = minutes % 10;

    const formatted = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;
    setFormattedValue(formatted);
    setInputValue(formatted);

    onChange(convertTo24HourFormat(formatted));
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex === null || prevIndex === dropdownValues.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0 ? dropdownValues.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'Enter' && activeIndex !== null) {
        e.preventDefault();
        const selectedValue = dropdownValues[activeIndex];
        setInputValue(selectedValue);
        setFormattedValue(selectedValue);
        setShowDropdown(false);
      }
    }

    inputRef.current?.addEventListener('keydown', handleKeyDown);
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [dropdownValues, activeIndex]);

  useEffect(() => {
    if (showDropdown && dropdownRef.current && activeIndex !== null) {
      dropdownRef.current.scrollTop = activeIndex * 30; // Scroll to active item
    }
  }, [showDropdown, activeIndex]);

  useEffect(() => {
    const intervalTimes: string[] = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let min = 0; min <= 59; min += 30) {
        const time = new Date(0, 0, 0, hour, min);
        intervalTimes.push(formatTime(time));
      }
    }
    setDropdownValues(intervalTimes);
  }, []);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const currentIndex = dropdownValues.findIndex((time) => time === formattedValue);
      if (currentIndex !== -1) {
        dropdownRef.current.scrollTop = currentIndex * 30;
      }
    }
  }, [showDropdown, dropdownValues, formattedValue]);

  return (
    <div className="time-input-wrapper">
      <input
        type="text"
        value={inputValue}
        placeholder={formattedValue}
        className="ib__sc-form-control"
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          handleInputBlur();

          setTimeout(() => setShowDropdown(false), 200);
        }}
        ref={inputRef}
      />
      {showDropdown && (
        <div className="dropdown-time" ref={dropdownRef}>
          {dropdownValues.map((value, index) => (
            <div
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => {
                setInputValue(value);
                setFormattedValue(value);
                setShowDropdown(false);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeInput;
