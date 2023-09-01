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
    const hoursStr = String(hours).padStart(2, '0');
    return `${hoursStr}:${minutesStr} ${ampm}`;
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

  function handleInputBlur(value?:string): void {
    console.log("handleInputBlur")
    console.log("inputValue",inputValue)
    console.log("value",value)
    // Remove all non-digit characters and convert to uppercase
    const originalStr =(value ? value: inputValue).toUpperCase();
    const inputStr = originalStr.replace(/[^\d]/g, '');
    
    // Get the first two characters for hours and the next two for minutes
    let hours = parseInt(inputStr.substring(0, 2), 10) || 0;
    const  minutes = parseInt(inputStr.substring(2, 4), 10) || 0;
    console.log("inputStr========", inputStr,hours)
    // Determine AM/PM based on input
    let ampm = 'AM'
    if (originalStr.includes('P')) {
      ampm = 'PM';
    } else if (originalStr.includes('A')) {
      ampm = 'AM';
    } else if (hours >= 12) {
      ampm = 'PM';
    }

    
  
 
    // Convert to 12-hour format if necessary
    if (hours > 12) hours -= 12;
    
    // Handle the case where hours are more than 24
    if (hours > 24) hours = parseInt(inputStr.charAt(0), 10) || 0;

    if(minutes > 59) hours = parseInt(inputStr.charAt(0), 10) || 0;
    
    // Add leading zeros and format the time
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
    // Update state or perform other actions as needed
    setFormattedValue(formatted);
    setInputValue(formatted);
    
    // Call the onChange function with the converted time
    onChange(convertTo24HourFormat(formatted));
  }
  
  
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      console.log("handleKeyDown")
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
       
        setTimeout(() => {
        inputRef.current?.blur(); // Blur the input
        setShowDropdown(false);
       }, 100);
      }else if (e.key === 'Escape' || e.key === 'Enter') {
        setTimeout(() => {  
          inputRef.current?.blur(); // Blur the input
          setShowDropdown(false);
         }, 100);
        e.preventDefault();
      }else{
        setActiveIndex(null);
        
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
          setTimeout(() => setShowDropdown(false), 500);
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
         
                handleInputBlur(value);
                setTimeout(() => setShowDropdown(false), 500);
              
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
