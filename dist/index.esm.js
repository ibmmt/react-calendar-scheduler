import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const weekdaysArr = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];
const fullWeekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const formatDate = (dateObj, formatStr) => {
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    const shortMonthName = monthsArr[dateObj.getMonth()].slice(0, 3);
    const longMonthName = monthsArr[dateObj.getMonth()];
    const shortWeekdayName = weekdaysArr[dateObj.getDay()];
    const longWeekdayName = fullWeekdayNames[dateObj.getDay()];
    // Replace format placeholders with date values
    let formattedStr = formatStr.replace('yyyy', year);
    formattedStr = formattedStr.replace('yy', year.slice(-2));
    formattedStr = formattedStr.replace('MMMM', longMonthName);
    formattedStr = formattedStr.replace('MMM', shortMonthName);
    formattedStr = formattedStr.replace('MM', month);
    formattedStr = formattedStr.replace('dddd', longWeekdayName);
    formattedStr = formattedStr.replace('ddd', shortWeekdayName);
    formattedStr = formattedStr.replace('dd', day);
    formattedStr = formattedStr.replace('HH', hours);
    formattedStr = formattedStr.replace('hh', (Number(hours) % 12 || 12).toString().padStart(2, '0'));
    formattedStr = formattedStr.replace('mm', minutes);
    formattedStr = formattedStr.replace('ss', seconds);
    formattedStr = formattedStr.replace('H', hours);
    return formattedStr;
};
const parseDate = (dateStr, formatStr) => {
    const formatParts = formatStr.split(/[^a-zA-Z]/);
    const dateParts = dateStr.split(/[^0-9]/);
    let year;
    let month;
    let day;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    for (let i = 0; i < formatParts.length; i++) {
        const formatPart = formatParts[i];
        const datePart = dateParts[i];
        if (formatPart.includes('yyyy')) {
            year = parseInt(datePart, 10);
        }
        else if (formatPart.includes('MM')) {
            month = parseInt(datePart, 10) - 1;
        }
        else if (formatPart.includes('dd')) {
            day = parseInt(datePart, 10);
        }
        else if (formatPart.includes('HH')) {
            hours = parseInt(datePart, 10);
        }
        else if (formatPart.includes('mm')) {
            minutes = parseInt(datePart, 10);
        }
        else if (formatPart.includes('ss')) {
            seconds = parseInt(datePart, 10);
        }
    }
    if (year === undefined || month === undefined || day === undefined) {
        throw new Error('Invalid date format or input');
    }
    return new Date(year, month, day, hours, minutes, seconds);
};
const strinkEvent = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
leftOvercome, percentage, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
srinkedObject) => {
    if (leftOvercome.length === 0)
        return;
    leftOvercome.forEach(event => {
        if (srinkedObject[event.sc_app__id])
            return;
        srinkedObject[event.sc_app__id] = true;
        event.width = event.width * percentage;
        event.left = event.left * percentage;
        strinkEvent(event.leftOvercome, percentage, srinkedObject);
    });
};
const calculatePositions = (events, isMonth) => {
    const totalWidth = 100;
    //sort events by start time
    const sortedEvents = events.sort((a, b) => a['startTime'] - b['startTime']);
    const startKey = isMonth ? 'startDate' : 'startTime';
    const endKey = isMonth ? 'endDate' : 'endTime';
    for (let i = 0; i < sortedEvents.length; i++) {
        let width = 0;
        let left = 0;
        const leftOvercome = [];
        for (let k = 0; k < i; k++) {
            if (sortedEvents[k][endKey] >= sortedEvents[i][startKey]) {
                leftOvercome.push(sortedEvents[k]);
            }
        }
        if (leftOvercome.length) {
            leftOvercome.sort((a, b) => a.left - b.left);
            if (leftOvercome[0].left > 0) {
                width = leftOvercome[0].left;
            }
            else {
                for (let k = 0; k < leftOvercome.length - 1; k++) {
                    if (leftOvercome[k + 1].left -
                        (leftOvercome[k].width + leftOvercome[k].left) >
                        1) {
                        width =
                            leftOvercome[k].left +
                                leftOvercome[k].width -
                                leftOvercome[k].left;
                        left = leftOvercome[k].left + leftOvercome[k].width;
                        break;
                    }
                }
            }
            if (width === 0 &&
                totalWidth -
                    leftOvercome[leftOvercome.length - 1].left -
                    leftOvercome[leftOvercome.length - 1].width >
                    1) {
                width =
                    totalWidth -
                        leftOvercome[leftOvercome.length - 1].left -
                        leftOvercome[leftOvercome.length - 1].width;
                left =
                    leftOvercome[leftOvercome.length - 1].left +
                        leftOvercome[leftOvercome.length - 1].width;
            }
        }
        sortedEvents[i].leftOvercome = leftOvercome;
        if (width === 0) {
            if (leftOvercome.length === 0) {
                width = totalWidth;
            }
            else {
                width = totalWidth / (1 + totalWidth / leftOvercome[0].width);
            }
            left = totalWidth - width;
            strinkEvent(leftOvercome, 1 - width / totalWidth, {});
        }
        sortedEvents[i].width = width;
        sortedEvents[i].left = left;
    }
    return sortedEvents;
};
const convertToComponentEventFormat = (events, dateFormat) => {
    const tempEvents = [];
    for (let i = 0; i < events.length; i++) {
        const eventObj = events[i];
        const startDate = new Date(parseDate(eventObj.startDate, dateFormat)).setHours(0, 0, 0, 0);
        const endDate = new Date(parseDate(eventObj.endDate, dateFormat)).setHours(0, 0, 0, 0);
        const startTimeSplit = eventObj.startTime
            ? eventObj.startTime.split(':')
            : ['0', '0', '0', '0'];
        const endTimeSplit = eventObj.startTime
            ? eventObj.endTime.split(':')
            : ['0', '0', '0', '0'];
        // ---todo validate date formate
        const startTime = new Date(startDate).setHours(parseInt(startTimeSplit[0], 10), parseInt(startTimeSplit[1], 10), parseInt(startTimeSplit[2], 10), 0);
        const endTime = new Date(endDate).setHours(parseInt(endTimeSplit[0], 10), parseInt(endTimeSplit[1], 10), parseInt(endTimeSplit[2], 10), 0);
        const total_event_time = (endTime - startTime) / 3600000;
        const eventObjNew = Object.assign(Object.assign({}, eventObj), { sc_app__id: eventObj.sc_app__id, title: eventObj.title, startDate,
            endDate,
            startTime,
            endTime,
            total_event_time });
        tempEvents.push(eventObjNew);
    }
    return tempEvents;
};
const isDateBetween = (dateObj, startTime, endTime) => {
    const date = dateObj.getTime();
    const startTime_daystart = new Date(startTime).setHours(0, 0, 0, 0);
    const endtime_dayend = new Date(endTime).setHours(23, 59, 59, 999);
    return date >= startTime_daystart && date <= endtime_dayend;
};
const setEventID = (events) => {
    if (!events)
        return [];
    for (let i = 0; i < events.length; i++) {
        events[i].sc_app__id = i + 1;
    }
    return events;
};
function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
function getDaysDifference(date1, date2) {
    const diffMs = date1.getTime() - date2.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days;
}
function addDays(date, days) {
    const dateMs = date.getTime();
    const daysMs = days * 24 * 60 * 60 * 1000;
    const newDateMs = dateMs + daysMs;
    const newDate = new Date(newDateMs);
    return newDate;
}
function addTimeStringTodate(date, time) {
    let [hours, minutes] = time.split(':');
    const hours_num = Number(hours);
    minutes = minutes.replace(/[^0-9]/g, '');
    if (time.includes('PM') && hours_num < 12) {
        hours += 12;
    }
    date.setHours(hours_num);
    date.setMinutes(Number(minutes));
    return date;
}
function getPreviousDay(dayNo, date) {
    dayNo = dayNo !== undefined ? dayNo : 1;
    const today = date ? date : new Date();
    if (today.getDay() === dayNo) {
        return today;
    }
    const daysToPreviousDay = (today.getDay() + 7 - dayNo) % 7;
    const previousDay = new Date(today.getTime() - daysToPreviousDay * 86400000);
    return previousDay;
}
const timeFormateFromHour = (hours, timeFormat) => {
    if (timeFormat == 12) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const timeString = ('0' + hours).slice(-2) + ':' + '00' + ' ' + ampm;
        return timeString;
    }
    else {
        const timeString = ('0' + hours).slice(-2) + ':' + '00';
        return timeString;
    }
};
const convertToOutputEventFormat = (eventObj) => {
    const event = Object.assign(Object.assign({}, eventObj), { startDate: eventObj.startTime
            ? formatDate(new Date(eventObj.startTime), 'dd/MM/yyyy')
            : '', endDate: eventObj.endTime
            ? formatDate(new Date(eventObj.endTime), 'dd/MM/yyyy')
            : '', startTime: eventObj.startTime
            ? formatDate(new Date(eventObj.startTime), 'H:mm:ss')
            : '', endTime: eventObj.endTime
            ? formatDate(new Date(eventObj.endTime), 'H:mm:ss')
            : '' });
    return event;
};
const convertTo12Hour = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    let hoursInt = parseInt(hours, 10);
    let period = 'AM';
    if (hoursInt >= 12) {
        period = 'PM';
    }
    if (hoursInt == 0) {
        hoursInt = 12;
    }
    else if (hoursInt > 12) {
        hoursInt -= 12;
    }
    return `${hours}:${minutes} ${period}`;
};
const convertTo24HourFormat = (timeStr) => {
    if (!timeStr) {
        return '';
    }
    timeStr = timeStr.trim();
    timeStr = timeStr.toUpperCase();
    let [time, meridian] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    if (!meridian) {
        meridian = 'AM';
    }
    if (!time) {
        time = '0';
    }
    let hoursInt = parseInt(hours, 10);
    if (meridian.toLowerCase() === 'PM' && hoursInt !== 12) {
        hoursInt += 12;
    }
    else if (meridian.toLowerCase() === 'AM' && hoursInt === 12) {
        hoursInt = 0;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".time-input-wrapper {\r\n    position: relative;\r\n}\r\n\r\n.dropdown-time {\r\n    position: absolute;\r\n    width: 100%;\r\n    border: 1px solid #ccc;\r\n    max-height: 120px;\r\n    overflow-y: scroll;\r\n    z-index: 1;\r\n    background-color: #fff;\r\n}\r\n\r\n.dropdown-time div {\r\n    padding: 5px;\r\n    cursor: pointer;\r\n    font-size: 15px;\r\n    height: 20px;\r\n\r\n}\r\n.dropdown-time  .active {\r\n    background-color: #4CAF50;\r\n    color: white;\r\n}\r\n\r\n.dropdown-time div:hover {\r\n    background-color: #ddd;\r\n}\r\n";
styleInject(css_248z$1);

function TimeInput({ onChange, value }) {
    const [inputValue, setInputValue] = useState('');
    const [formattedValue, setFormattedValue] = useState(formatTime(new Date()));
    const [dropdownValues, setDropdownValues] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    function formatTime(date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = String(minutes).padStart(2, '0');
        return `${hours}:${minutesStr} ${ampm}`;
    }
    function handleInputChange(e) {
        e.preventDefault();
        setInputValue(e.target.value);
    }
    useEffect(() => {
        if (value) {
            setInputValue(convertTo12Hour(value));
        }
    }, [value]);
    function handleInputBlur() {
        const inputStr = inputValue.replace(/[^\d]/g, '').toUpperCase();
        let hours = parseInt(inputStr.substr(0, 2), 10) || 0;
        let minutes = parseInt(inputStr.substr(2, 2), 10) || 0;
        const ampm = inputValue.toUpperCase().includes('P') ? 'PM' : 'AM';
        if (hours > 24)
            hours = hours % 10;
        if (minutes > 59)
            minutes = minutes % 10;
        const formatted = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')} ${ampm}`;
        setFormattedValue(formatted);
        setInputValue(formatted);
        onChange(convertTo24HourFormat(formatted));
    }
    useEffect(() => {
        var _a;
        function handleKeyDown(e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex((prevIndex) => prevIndex === null || prevIndex === dropdownValues.length - 1 ? 0 : prevIndex + 1);
            }
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex((prevIndex) => prevIndex === null || prevIndex === 0 ? dropdownValues.length - 1 : prevIndex - 1);
            }
            else if (e.key === 'Enter' && activeIndex !== null) {
                e.preventDefault();
                const selectedValue = dropdownValues[activeIndex];
                setInputValue(selectedValue);
                setFormattedValue(selectedValue);
                setShowDropdown(false);
            }
        }
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', handleKeyDown);
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
        const intervalTimes = [];
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
    return (jsxs("div", Object.assign({ className: "time-input-wrapper" }, { children: [jsx("input", { type: "text", value: inputValue, placeholder: formattedValue, className: "ib__sc-form-control", onChange: handleInputChange, onFocus: () => setShowDropdown(true), onBlur: () => {
                    handleInputBlur();
                    setTimeout(() => setShowDropdown(false), 200);
                }, ref: inputRef }), showDropdown && (jsx("div", Object.assign({ className: "dropdown-time", ref: dropdownRef }, { children: dropdownValues.map((value, index) => (jsx("div", Object.assign({ className: index === activeIndex ? 'active' : '', onClick: () => {
                        setInputValue(value);
                        setFormattedValue(value);
                        setShowDropdown(false);
                    } }, { children: value }), index))) })))] })));
}

const AddEventModal = (_a) => {
    var { show, handleClose, handleAddEvent, handleDeleteEvent: _handleDeleteEvent } = _a, _b = _a.eventObj, { title: titleInit = '', startDate: startDateInit = '', endDate: endDateInit = '', startTime: startTimeInit = '', endTime: endTimeInit = '', bg_color: bg_colorInit = '#5c6bc0', description: descriptionInit = '', sc_app__id = '' } = _b, otherEventData = __rest(_b, ["title", "startDate", "endDate", "startTime", "endTime", "bg_color", "description", "sc_app__id"]);
    const now = new Date();
    const dateString = formatDate(now, 'yyyy-MM-dd');
    const [title, setTitle] = useState(titleInit);
    const [startDate, setStartDate] = useState(startDateInit ? startDateInit : dateString);
    const [endDate, setEndDate] = useState(endDateInit ? endDateInit : dateString);
    const [startTime, setStartTime] = useState(startTimeInit);
    const [endTime, setEndTime] = useState(endTimeInit);
    const [bg_color, setBg_color] = useState(bg_colorInit);
    const [description, setDescription] = useState(descriptionInit);
    /**
     * handle submit event
     * @param {*} e
     * @returns
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateTimeAndDate()) {
            return;
        }
        const startDateObj = addTimeStringTodate(new Date(startDate), startTime);
        const endDateObj = addTimeStringTodate(new Date(endDate), endTime);
        const eventObj = Object.assign(Object.assign({}, otherEventData), { title,
            sc_app__id,
            description, startDate: formatDate(new Date(startDateObj), 'dd/MM/yyyy'), endDate: formatDate(new Date(endDateObj), 'dd/MM/yyyy'), startTime: formatDate(new Date(startDateObj), 'H:mm:ss'), endTime: formatDate(new Date(endDateObj), 'H:mm:ss'), bg_color: bg_color });
        handleAddEvent(eventObj);
        handleClose();
    };
    /**
     * handle delete event
     * @param {*} e
     */
    const handleDeleteEvent = (e) => {
        e.preventDefault();
        _handleDeleteEvent && _handleDeleteEvent(sc_app__id);
        handleClose();
    };
    /**
     * Validate date and time
     * @returns {Boolean} true if valid date and time
     */
    const validateTimeAndDate = () => {
        if (!startDate || !endDate || !startTime || !endTime) {
            alert('Please fill all the fields');
            return false;
        }
        let startDateObj = new Date(startDate);
        let endDateObj = new Date(endDate);
        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
            alert('Invalid date');
            return false;
        }
        startDateObj = addTimeStringTodate(startDateObj, startTime);
        endDateObj = addTimeStringTodate(endDateObj, endTime);
        // check valid date and time
        if (startDateObj.getTime() > endDateObj.getTime()) {
            alert('Start date cannot be greater than end date');
            return false;
        }
        return true;
    };
    return (jsx("div", Object.assign({ className: "modal-wrapper ib__sc-modal", onClick: e => {
            if (e.target instanceof HTMLElement &&
                e.target.className.includes('ib__sc-modal')) {
                handleClose();
            }
        }, style: {
            transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
        } }, { children: jsxs("div", Object.assign({ className: "ib__sc-modal-content ib__sc_add_event_box" }, { children: [jsxs("div", Object.assign({ className: "modal-header" }, { children: [!sc_app__id ? jsx("p", { children: "Add Event" }) : jsx("p", { children: "Edit Event" }), jsx("span", Object.assign({ className: "ib__sc__close-modal-btn", onClick: handleClose }, { children: "\u00D7" }))] })), jsx("div", Object.assign({ className: "ib__sc-modal-body" }, { children: jsxs("form", Object.assign({ noValidate: true }, { children: [jsxs("div", Object.assign({ className: "ib__sc__form-group" }, { children: [jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "title" }, { children: "Title" })), jsx("input", { type: "text", placeholder: "Title", value: title, className: "ib__sc-form-control", onChange: e => setTitle(e.target.value), required: true })] })), jsxs("div", Object.assign({ className: "ib__sc__form-time-row" }, { children: [jsxs("div", Object.assign({ className: "ib__sc__form-group" }, { children: [jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "startDate" }, { children: "Start Date" })), jsx("input", { type: "date", placeholder: "yyyy-mm-dd", className: "ib__sc-form-control", value: startDate, onChange: e => setStartDate(e.target.value), required: true }), jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "startTime" }, { children: "Start Time" })), jsx(TimeInput, { value: startTime, onChange: (value) => setStartTime(value) })] })), jsxs("div", Object.assign({ className: "ib__sc__form-group" }, { children: [jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "endDate" }, { children: "End Date" })), jsx("input", { type: "date", placeholder: "yyyy-mm-dd", className: "ib__sc-form-control", value: endDate, onChange: e => setEndDate(e.target.value), required: true }), jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "endTime" }, { children: "End Time" })), jsx(TimeInput, { value: endTime, onChange: (value) => setEndTime(value) })] }))] })), jsxs("div", Object.assign({ className: "ib__sc__form-group" }, { children: [jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "bg_color" }, { children: "Description" })), jsx("input", { type: "color", value: bg_color, className: "ib__sc-form-control", onChange: e => setBg_color(e.target.value), required: true })] })), jsxs("div", Object.assign({ className: "ib__sc__form-group" }, { children: [jsx("label", Object.assign({ className: "ib__sc-label", htmlFor: "bg_color" }, { children: "Decription" })), jsx("textarea", { value: description, className: "ib__sc-form-control", onChange: e => setDescription(e.target.value), required: true })] })), jsxs("div", Object.assign({ className: "ib__sc__modal_footer" }, { children: [jsx("button", Object.assign({ className: "ib__sc__btn", onClick: handleSubmit }, { children: !sc_app__id ? jsx(Fragment, { children: "Save" }) : jsx(Fragment, { children: "Update " }) })), sc_app__id && (jsx("button", Object.assign({ className: "ib__sc__btn", onClick: e => {
                                            e.preventDefault();
                                        }, onDoubleClick: handleDeleteEvent }, { children: "Delete" })))] }))] })) }))] })) })));
};

function CalendarSwitch({ calenderType, handleClanderTypeChange, }) {
    return (jsx(React.Fragment, { children: jsxs("div", Object.assign({ className: "ib__sc__btn-group ib__sc__calander_switch" }, { children: [jsx("button", Object.assign({ className: 'ib__sc__btn ib_sc_btn_month ' +
                        (calenderType === 'month' ? 'active' : ''), onClick: () => handleClanderTypeChange('month') }, { children: "Month" })), jsx("button", Object.assign({ className: 'ib__sc__btn ib_sc_btn_week ' +
                        (calenderType === 'week' ? 'active' : ''), onClick: () => handleClanderTypeChange('week') }, { children: "Week" })), jsx("button", Object.assign({ className: 'ib__sc__btn ib_sc_btn_day ' +
                        (calenderType === 'day' ? 'active' : ''), onClick: () => handleClanderTypeChange('day') }, { children: "Day" }))] })) }));
}

const HOUR_MILLISECONDS = 60 * 60 * 1000;

const EventHandlerContex = createContext();

const EventBoxView = ({ eventObj, isShowTitle, isStart, }) => {
    var _a;
    const viewStyle = {
        height: '100%',
    };
    return (jsxs("div", Object.assign({ className: `ib__sc__event-box-view ${isStart ? 'ib__sc__staring_event_box' : ''} ${(_a = eventObj.custom_class) !== null && _a !== void 0 ? _a : ''}`, style: viewStyle }, { children: [isShowTitle && (jsx("div", Object.assign({ className: "ib__sc__event ib__sc__event-week_title" }, { children: eventObj.title }))), isShowTitle && (jsxs(Fragment, { children: [jsx("div", Object.assign({ className: "ib__sc__event-element" }, { children: eventObj.element && eventObj.element })), jsx("div", Object.assign({ className: "ib__sc__event-description" }, { children: eventObj.description && eventObj.description }))] }))] })));
};

const EventBoxWeek = ({ boxHeight, boxTime = 1, eventObj, boxDay, dragingEventId, }) => {
    const [isDraging, setIsDraging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [Offset, setOffset] = useState(0);
    const [eventHeight, setEventHeight] = useState(0);
    const [overLap, setOverLap] = useState({ top: false, bottom: false });
    const newEventTime = useRef({ start: 0, end: 0 });
    const { updateEvent, dragStart, dragEnd, calenderToAddOrUpdateEvent } = useContext(EventHandlerContex);
    const eventRef = useRef(null);
    const lastCleintYRef = useRef(0);
    const sideRef = useRef('');
    const mouseDownRef = useRef(false);
    const handleDragStart = () => {
        console.log('handleDragStart');
        setIsDraging(true);
        dragStart(eventObj, boxDay);
    };
    useEffect(() => {
        setTimeout(() => {
            if (dragingEventId === eventObj.sc_app__id) {
                setIsDraging(true);
            }
            else {
                setIsDraging(false);
            }
        }, 100);
    }, [dragingEventId]);
    const handleMouseDownResize = (e, side) => {
        e.stopPropagation();
        e.preventDefault();
        newEventTime.current.start = eventObj.startTime;
        newEventTime.current.end = eventObj.endTime;
        lastCleintYRef.current = 0;
        sideRef.current = side;
        setIsResizing(true);
    };
    const handleMouseUpDrag = (e) => {
        e.preventDefault();
        if (isDraging) {
            setTimeout(() => {
                setIsDraging(false);
            }, 100);
            dragEnd();
        }
    };
    const setPostionAndHeight = (startTime, endTime) => {
        const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
        const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);
        newEventTime.current.start = startTime;
        newEventTime.current.end = endTime;
        if (startTime < boxDayTimeStart) {
            startTime = boxDayTimeStart;
            setOverLap(Object.assign(Object.assign({}, overLap), { top: true }));
        }
        else {
            setOverLap(Object.assign(Object.assign({}, overLap), { top: false }));
        }
        if (endTime > boxDayTimeEnd) {
            endTime = boxDayTimeEnd;
            setOverLap(Object.assign(Object.assign({}, overLap), { bottom: true }));
        }
        else {
            setOverLap(Object.assign(Object.assign({}, overLap), { bottom: false }));
        }
        const total_event_time = (endTime - startTime) / HOUR_MILLISECONDS;
        const height = (boxHeight / boxTime) * total_event_time;
        setEventHeight(height);
        const hours_difference_from_start = (startTime - boxDayTimeStart) / HOUR_MILLISECONDS;
        const event_top = hours_difference_from_start * (boxHeight / boxTime) -
            hours_difference_from_start * 1;
        setOffset(event_top);
    };
    const resizeEventFun = (diff, side) => {
        if (side === 'top') {
            eventObj.startTime =
                eventObj.startTime + (diff / boxHeight) * boxTime * HOUR_MILLISECONDS;
            setPostionAndHeight(eventObj.startTime, eventObj.endTime);
        }
        if (side === 'bottom') {
            eventObj.endTime =
                eventObj.endTime + (diff / boxHeight) * boxTime * HOUR_MILLISECONDS;
            setPostionAndHeight(eventObj.startTime, eventObj.endTime);
        }
    };
    const handleMouseMoveResize = (e) => {
        if (!isResizing)
            return;
        if (lastCleintYRef.current == 0) {
            lastCleintYRef.current = e.clientY;
            return;
        }
        const diff = e.clientY - lastCleintYRef.current;
        if (diff > 10 || diff < -10) {
            resizeEventFun(diff, sideRef.current);
            lastCleintYRef.current = e.clientY;
        }
    };
    const handleMouseUpResize = (e) => {
        if (!isResizing)
            return;
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            setIsResizing(false);
        }, 100);
        lastCleintYRef.current = 0;
        updateEvent(Object.assign(Object.assign({}, eventObj), { startTime: newEventTime.current.start, endTime: newEventTime.current.end }));
    };
    useEffect(() => {
        if (!isResizing)
            return;
        document.addEventListener('mousemove', handleMouseMoveResize);
        document.addEventListener('mouseup', handleMouseUpResize);
        return () => {
            document.removeEventListener('mousemove', handleMouseMoveResize);
            document.removeEventListener('mouseup', handleMouseUpResize);
        };
    }, [isResizing]);
    useEffect(() => {
        if (!isDraging)
            return;
        document.addEventListener('mouseup', handleMouseUpDrag);
        return () => {
            document.removeEventListener('mouseup', handleMouseUpDrag);
        };
    }, [isDraging]);
    useEffect(() => {
        if (!eventObj)
            return;
        setPostionAndHeight(eventObj.startTime, eventObj.endTime);
    }, [eventObj, boxHeight, boxTime, boxDay]);
    const eventStyle = {
        width: (isDraging ? 100 : eventObj.width) + '%',
        left: (isDraging ? 0 : eventObj.left) + '%',
        top: Offset + 'px',
        cursor: 'move',
        opacity: isDraging ? 0.8 : 1,
        boxShadow: isDraging ? '0 0 10px 0 rgba(0,0,0,0.5)' : 'none',
        zIndex: isDraging || isResizing ? 10000 : 1,
        height: eventHeight + 'px',
    };
    return (jsx(Fragment, { children: eventObj && (jsx("div", Object.assign({ id: eventObj.sc_app__id, className: 'ib__sc__event-wrapper ib__sc__event-wrapper-week ' +
                (isDraging ? 'dragging' : ''), ref: eventRef, onMouseDown: e => {
                e.preventDefault();
                mouseDownRef.current = true;
            }, onMouseUp: e => {
                e.preventDefault();
                mouseDownRef.current = false;
            }, onMouseMove: () => {
                if (mouseDownRef.current && !isDraging) {
                    handleDragStart();
                }
            }, onClick: e => {
                if (isResizing)
                    return;
                if (isDraging)
                    return;
                e.stopPropagation();
                e.preventDefault();
                dragEnd();
                calenderToAddOrUpdateEvent(eventObj);
            }, style: eventStyle }, { children: jsxs("div", Object.assign({ className: "ib__sc__event-box ib__sc__event-box-week", style: {
                    height: eventHeight + 'px',
                    backgroundColor: eventObj.bg_color,
                } }, { children: [overLap && !overLap.top && (jsx("div", Object.assign({ style: isResizing ? { display: 'block' } : {}, className: "dragging-handler-week top", onMouseDown: e => {
                            handleMouseDownResize(e, 'top');
                        } }, { children: "=" }))), jsx(EventBoxView, { eventObj: eventObj, 
                        //eventHeight={eventHeight}
                        isShowTitle: true }), overLap && !overLap.bottom && (jsx("div", Object.assign({ style: isResizing ? { display: 'block' } : {}, className: "dragging-handler-week bottom", onMouseDown: e => {
                            handleMouseDownResize(e, 'bottom');
                        } }, { children: "=" })))] })) }))) }));
};

const DayColumnWeek = ({ events, boxHeight, boxDay, dragBoxMouseEnterToCell, calenderToAddOrUpdateEvent, dragingEventId, }) => {
    const BoxRef = useRef(null);
    /**
    * Handle event while entering in box
    * @param {MouseEvent} e
    */
    const dragMouseEnter = (e) => {
        e.preventDefault();
        dragBoxMouseEnterToCell(boxDay);
    };
    /**
     * Handle click on hour box
     * @param {*} e
     * @param {Number} hour
     */
    const handleClickHourBox = (e, hour) => {
        e.preventDefault();
        e.stopPropagation();
        calenderToAddOrUpdateEvent({
            startTime: new Date(boxDay).setHours(hour, 0, 0, 0),
            endTime: new Date(boxDay).setHours(hour + 1, 0, 0, 0),
        });
    };
    /**
     * Add event listener on mouse enter
     */
    useEffect(() => {
        if (!BoxRef.current)
            return;
        if (!dragingEventId)
            return;
        BoxRef.current.addEventListener('mouseenter', dragMouseEnter, true);
        return () => {
            var _a;
            (_a = BoxRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseenter', dragMouseEnter, true);
        };
    }, [dragingEventId]);
    if (events.length) {
        console.log("events------Day column", events);
    }
    return (jsx(Fragment, { children: jsx("div", Object.assign({ ref: BoxRef, className: "ib__sc__cell ib__sc__cell-week" }, { children: jsxs("div", Object.assign({ className: "ib__sc__cell-wrapper ib__sc__cell-wrapper-week" }, { children: [!!events &&
                        !!events.length &&
                        events.map(eventObj => (jsx(EventBoxWeek, { eventObj: eventObj, boxDay: boxDay, 
                            // calenderTableRef={calenderTableRef}
                            boxHeight: boxHeight, dragingEventId: dragingEventId }, eventObj.sc_app__id))), isSameDay(boxDay, new Date()) && (jsx(CurrentTimeBar, { boxHeight: boxHeight })), [...Array(24).keys()].map((hour, index) => (jsx("div", { onClick: e => handleClickHourBox(e, hour), style: { height: boxHeight + 'px' }, draggable: true, className: "ib__sc__table-hr-box-week" }, index)))] })) })) }));
};
const CurrentTimeBar = ({ boxHeight }) => {
    const [top, setTop] = useState(0);
    /**
     * Calculate top position of current time bar
     * @returns {Number}
     */
    const calculateTopCurrentTime = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMin = currentTime.getMinutes();
        const toalHours = currentHour + currentMin / 60;
        const top = toalHours * boxHeight;
        setTop(top);
    };
    /**
     * Calculate top position of current time bar
     */
    useEffect(() => {
        calculateTopCurrentTime();
        const interval = setInterval(() => {
            calculateTopCurrentTime();
        }, 10000);
        return () => clearInterval(interval);
    }, [boxHeight]);
    return (jsx("div", { style: { top: top + 'px' }, className: "ib__sc__daybar-week" }));
};

const leftIconImg = '../assets/img/left-arrow.png';
const rightIconImg = '../assets/img/right-arrow.png';
const LeftIcon = () => jsx("img", { src: leftIconImg, alt: "lefticon" });
const RightIcon = () => jsx("img", { src: rightIconImg, alt: "righticon" });

const boxHeightInit = 25;
const boxTime = 1; //1 hr
const CalendarWeek = ({ eventsData, updateEvent, selectedDate, calenderType, weekHourBoxHeight = boxHeightInit, startingWeekday, weekCalenderDayStartFromHour, weekCalenderVisibleHour = 12, weekCalenderTitleFormate = 'ddd', weekCalenderTimeFormate = 24, noOfDayColumn, calenderHeight, isShowAddNewEventButton, weekCalenderNextBtnDayIncrement, handleNextClick: _handleNextClick, handlePrevClick: _handlePrevClick, handleChangeCurrentDate: _handleChangeCurrentDate, calenderToAddOrUpdateEvent, handleIncreaseTimeSpan: _handleIncreaseTimeSpan, handleClanderTypeChange, }) => {
    const [events, setEvents] = useState(eventsData);
    const calenderTableRef = useRef(null);
    const lastCleintYRef = useRef(0);
    const dragEventRef = useRef(null);
    const currentDragDate = useRef(null);
    const boxHeight = weekHourBoxHeight;
    const heightOfWeekColumn = boxHeight * boxTime * 24;
    const [isDraging, setIsDraging] = useState(false);
    const initSelectedDate = () => {
        let initDay = new Date();
        if (selectedDate && Object.keys(selectedDate).length) {
            initDay = selectedDate;
        }
        if (calenderType === 'week') {
            return getPreviousDay(startingWeekday, initDay);
        }
        else {
            return initDay;
        }
    };
    const findAndSetEvent = (event, events) => {
        const index = events.findIndex(e => e.sc_app__id === event.sc_app__id);
        if (index > -1) {
            events[index] = event;
            setEvents([...events]);
        }
    };
    useEffect(() => {
        setEvents(calculatePositions(eventsData, false));
    }, [eventsData]);
    useEffect(() => {
        setDateStartFrom(initSelectedDate());
    }, [calenderType]);
    const [dateStartFrom, setDateStartFrom] = useState(initSelectedDate);
    useEffect(() => {
        if (!dateStartFrom || Object.keys(dateStartFrom).length === 0)
            return;
        setDateStartFrom(dateStartFrom);
        if (_handleChangeCurrentDate)
            _handleChangeCurrentDate(dateStartFrom, calenderType);
    }, [dateStartFrom]);
    useEffect(() => {
        if (calenderTableRef.current) {
            calenderTableRef.current.scrollTop =
                (weekCalenderDayStartFromHour * boxHeight) / boxTime;
        }
    }, [weekHourBoxHeight]);
    const dragStart = (event, selectedDate) => {
        currentDragDate.current = selectedDate;
        dragEventRef.current = Object.assign(Object.assign({}, event), { left: '0', width: 100 });
        setIsDraging(true);
    };
    const dragBoxMouseEnterToCell = (date) => {
        if (!currentDragDate.current)
            return;
        const daysDiff = getDaysDifference(date, currentDragDate.current);
        if (daysDiff != 0 && dragEventRef.current) {
            dragEventRef.current.startTime = dragEventRef.current.startTime ? dragEventRef.current.startTime : 0;
            dragEventRef.current.startTime +=
                daysDiff * 24 * HOUR_MILLISECONDS;
            dragEventRef.current.endTime = dragEventRef.current.endTime ? dragEventRef.current.endTime : 0;
            dragEventRef.current.endTime +=
                daysDiff * 24 * HOUR_MILLISECONDS;
            currentDragDate.current = date;
            findAndSetEvent(Object.assign({}, dragEventRef.current), events);
        }
    };
    const dragingMouseMoveHandler = (e) => {
        e.preventDefault();
        if (!dragEventRef.current)
            return;
        if (lastCleintYRef.current === 0) {
            lastCleintYRef.current = e.clientY;
            return;
        }
        const diff = e.clientY - lastCleintYRef.current;
        dragEventRef.current.startTime = dragEventRef.current.startTime ? dragEventRef.current.startTime : 0;
        dragEventRef.current.endTime = dragEventRef.current.endTime ? dragEventRef.current.endTime : 0;
        if (diff > 10 || diff < -10) {
            dragEventRef.current.startTime +=
                (diff / boxHeight) * boxTime * 3600000;
            dragEventRef.current.endTime +=
                (diff / boxHeight) * boxTime * 3600000;
            findAndSetEvent(Object.assign({}, dragEventRef.current), events);
            lastCleintYRef.current = e.clientY;
        }
    };
    const dropHandler = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (dragEventRef.current) {
            updateEvent(Object.assign({}, dragEventRef.current));
            lastCleintYRef.current = 0;
            dragEventRef.current = null;
        }
        setIsDraging(false);
        document.removeEventListener('mousemove', dragingMouseMoveHandler);
    };
    useEffect(() => {
        if (!dragEventRef.current || !isDraging)
            return;
        document.addEventListener('mousemove', dragingMouseMoveHandler);
        document.addEventListener('mouseup', dropHandler);
        document.body.style.userSelect = 'none';
        return () => {
            document.body.style.userSelect = 'auto';
            document.removeEventListener('mousemove', dragingMouseMoveHandler);
            document.removeEventListener('mouseup', dropHandler);
        };
    }, [isDraging]);
    const onWeekChange = (diff) => {
        const dayDiff = noOfDayColumn > weekCalenderNextBtnDayIncrement
            ? weekCalenderNextBtnDayIncrement
            : noOfDayColumn;
        const newDateString = addDays(dateStartFrom, dayDiff * diff);
        setDateStartFrom(newDateString);
        if (diff > 0) {
            typeof _handleNextClick === 'function' &&
                _handleNextClick(newDateString, calenderType);
        }
        else {
            typeof _handlePrevClick === 'function' &&
                _handlePrevClick(newDateString, calenderType);
        }
    };
    const heightOfWeekColumnToShow = (boxHeight / boxTime) * weekCalenderVisibleHour;
    if (!calenderHeight) {
        calenderHeight = heightOfWeekColumnToShow;
    }
    return (jsx("div", { children: jsxs("div", Object.assign({ className: 'ib__sc__table ib__sc__table-week ib_sc_type_' + calenderType }, { children: [jsx("div", Object.assign({ className: "ib__sc__header_wrapper" }, { children: jsxs("div", Object.assign({ className: "ib__sc__header" }, { children: [jsx("div", Object.assign({ className: "ib__sc__header__date-switch" }, { children: jsx("div", Object.assign({ className: "ib__sc__week-date" }, { children: jsxs("div", Object.assign({ className: "ib__sc__week-date-btn-group" }, { children: [jsx("button", Object.assign({ className: "ib__sc__week-date__bt-prev ib__sc__np__btn", onClick: () => onWeekChange(-1) }, { children: jsx(LeftIcon, {}) })), jsx("div", Object.assign({ className: "ib__sc__week-date__bt-text" }, { children: jsx("input", { type: "date", className: "ib__sc-form-control", onChange: (e) => {
                                                        setDateStartFrom(new Date(e.target.value));
                                                    }, value: formatDate(dateStartFrom, 'yyyy-MM-dd') }) })), jsx("button", Object.assign({ className: "ib__sc__week-date__bt-next ib__sc__np__btn", onClick: () => onWeekChange(1) }, { children: jsx(RightIcon, {}) }))] })) })) })), jsx("div", { className: "ib__sc__header__center" }), jsxs("div", Object.assign({ className: "ib__sc__header__right" }, { children: [isShowAddNewEventButton && jsx("div", Object.assign({ className: "ib__sc__header__right__btn-group" }, { children: jsx("button", Object.assign({ className: "ib__sc__btn", onClick: () => { if (calenderToAddOrUpdateEvent)
                                                calenderToAddOrUpdateEvent({}); } }, { children: "Add Event" })) })), jsx(CalendarSwitch, { calenderType: calenderType, handleClanderTypeChange: (type) => { if (handleClanderTypeChange)
                                            handleClanderTypeChange(type); } })] }))] })) })), jsx("div", Object.assign({ style: { position: 'relative', display: 'flex' } }, { children: jsx(EventHandlerContex.Provider, Object.assign({ value: {
                            dragStart,
                            updateEvent: updateEvent,
                            dragEnd: dropHandler,
                            calenderToAddOrUpdateEvent: calenderToAddOrUpdateEvent,
                        } }, { children: jsx("div", Object.assign({ className: "ib__sc__table-out ib__sc__table-out-week", style: {
                                maxHeight: calenderHeight,
                                overflowY: heightOfWeekColumn > calenderHeight ? 'scroll' : 'initial',
                            }, ref: calenderTableRef }, { children: jsxs("div", Object.assign({ className: "ib__sc__tb-wrapper ib__sc__tb-wrapper-week" }, { children: [jsxs("div", Object.assign({ className: "ib__sc__tb_week_time", style: { minHeight: heightOfWeekColumn + 'px' } }, { children: [jsx("div", Object.assign({ className: "ib__sc__table-th" }, { children: jsxs("div", Object.assign({ className: "ib__sc__btn-group ib__sc__increment-timespan ib__sc__flex_center" }, { children: [jsx("button", Object.assign({ className: "ib__sc__btn", onClick: () => _handleIncreaseTimeSpan(-1) }, { children: "-" })), jsx("button", Object.assign({ className: "ib__sc__btn", onClick: () => {
                                                                _handleIncreaseTimeSpan(1);
                                                            } }, { children: "+" }))] })) })), jsx("div", Object.assign({ className: "ib__sc__cell ib__sc__cell-week" }, { children: [...Array(24).keys()].map((hour, index) => (jsx("div", Object.assign({ style: { height: boxHeight + 'px' }, className: " ib__sc__week-time", draggable: "true" }, { children: index !== 0 && (jsx("span", Object.assign({ className: "ib__sc__time_title" }, { children: timeFormateFromHour(hour, weekCalenderTimeFormate) }))) }), index))) }))] })), [...Array(noOfDayColumn).keys()].map((dayIndex) => {
                                        const now = new Date(dateStartFrom);
                                        const boxDay = new Date(now.setDate(now.getDate() + dayIndex)).setHours(0, 0, 0, 0);
                                        return (jsxs("div", Object.assign({ className: "ib__sc__table-td ib__sc__table-td-week", style: { minHeight: heightOfWeekColumn + 'px' } }, { children: [jsx("div", Object.assign({ className: "ib__sc__table-th ib__sc__truncate" }, { children: formatDate(new Date(boxDay), weekCalenderTitleFormate) }), dayIndex), jsx(DayColumnWeek, { calenderTableRef: calenderTableRef, boxHeight: boxHeight, updateEvent: updateEvent, 
                                                    // dragingEventId={
                                                    //   dragEventRef.current
                                                    //     ? dragEventRef.current.sc_app__id
                                                    //     : null
                                                    // }
                                                    dragingEventId: dragEventRef.current
                                                        ? dragEventRef.current.sc_app__id
                                                        : "", boxDay: new Date(boxDay), dragBoxMouseEnterToCell: dragBoxMouseEnterToCell, calenderToAddOrUpdateEvent: calenderToAddOrUpdateEvent, events: events
                                                        ? events.filter((event) => {
                                                            if (event.startTime && event.endTime) {
                                                                return isDateBetween(new Date(boxDay), event.startTime, event.endTime);
                                                            }
                                                        })
                                                        : [] })] }), dayIndex));
                                    })] })) })) })) }))] })) }));
};

const EventBoxMonth = ({ boxHeight, boxTime, eventObj, boxDay, isCalender, isDraging, isResizing, }) => {
    const [offset, setOffset] = useState(0);
    const [eventHeight, setEventHeight] = useState(0);
    const [overLap, setOverLap] = useState({ start: false, end: false });
    const newEventTime = useRef({ start: 0, end: 0 });
    const mouseDownRef = useRef(false);
    const { dragStart, dragEnd, resizeStart, resizeEnd, calenderToAddOrUpdateEvent, } = useContext(EventHandlerContex);
    const eventRef = useRef(null);
    /**
     * Handle mouse Down on the event box, to start drag
     * @param {}
     */
    const handleDragStart = () => {
        if (isResizing) {
            dragEnd();
        }
        else {
            dragStart(eventObj, boxDay);
        }
    };
    /**
     * handle mouse Down on Resize bar
     * @param {Event} e
     * @param {String} side
     */
    const handleMouseDownResize = (e, side) => {
        e.stopPropagation();
        e.preventDefault();
        resizeStart(eventObj, boxDay, side);
    };
    /**
     * Handle mouse move on the event box, to drag
     * @param {number} startTime
     * @param {number} endTime
     */
    const setPostionAndHeight = (startTime, endTime) => {
        if (!startTime || !endTime) {
            return;
        }
        const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
        const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);
        newEventTime.current.start = startTime;
        newEventTime.current.end = endTime;
        /*
         * check if the event is over lapping with the box
         */
        if (startTime < boxDayTimeStart) {
            startTime = boxDayTimeStart;
            overLap.start = true;
        }
        else {
            overLap.start = false;
        }
        if (endTime > boxDayTimeEnd) {
            endTime = boxDayTimeEnd;
            overLap.end = true;
        }
        else {
            overLap.end = false;
        }
        setOverLap(Object.assign({}, overLap));
        const total_event_time = (endTime - startTime) / HOUR_MILLISECONDS;
        const height = (boxHeight / boxTime) * total_event_time;
        setEventHeight(height);
        const hours_difference_from_start = (startTime - boxDayTimeStart) / HOUR_MILLISECONDS;
        const event_top = hours_difference_from_start * (boxHeight / boxTime);
        setOffset(event_top);
    };
    /*
     * handle mouse up on the event box, to stop drag
     * @param {Event} e
     * */
    const handleMouseUpResize = (e) => {
        if (!isResizing)
            return;
        e.preventDefault();
        resizeEnd();
    };
    const handleMouseUpDrag = (e) => {
        e.preventDefault();
        dragEnd();
    };
    useEffect(() => {
        if (!isDraging)
            return;
        document.addEventListener('mouseup', handleMouseUpDrag);
        return () => {
            document.removeEventListener('mouseup', handleMouseUpDrag);
        };
    }, [isDraging]);
    /*
     * use effect to add mouse move and mouse up event listener
     * */
    useEffect(() => {
        if (!isResizing)
            return;
        document.addEventListener('mouseup', handleMouseUpResize);
        return () => {
            document.removeEventListener('mouseup', handleMouseUpResize);
        };
    }, [isResizing]);
    /*
     * use effect to set the event position and height
     * */
    useEffect(() => {
        if (!eventObj)
            return;
        setPostionAndHeight(eventObj.startTime, eventObj.endTime);
    }, [
        eventObj,
        eventObj.startTime,
        eventObj.endTime,
        boxHeight,
        boxTime,
        boxDay,
    ]);
    const eventStyle = {
        width: eventObj.width + '%',
        left: eventObj.left + '%',
        top: offset + 'px',
        // resize: 'both',
        cursor: 'move',
        opacity: isDraging || isResizing ? 0.9 : 1,
        zIndex: isDraging || isResizing ? 10000 : 1,
        height: eventHeight + 'px',
    };
    const eventBoxStyle = {
        backgroundColor: eventObj.bg_color,
    };
    if (isCalender) {
        eventStyle.width = '100%';
        eventStyle.left = '0%';
        eventStyle.top = eventObj.left + '%';
        eventStyle.height = eventObj.width + '%';
    }
    else {
        eventStyle.width = eventObj.width + '%';
        eventStyle.left = eventObj.left + '%';
        eventStyle.top = offset + 'px';
        eventStyle.height = eventHeight + 'px';
    }
    return (jsx(Fragment, { children: eventObj && (jsx("div", Object.assign({ id: eventObj.sc_app__id + '', className: 'ib__sc__event-wrapper ib__sc__event-wrapper-month ' +
                (isDraging ? 'dragging' : '') +
                ' ' +
                (overLap.start ? 'overlap-start' : '') +
                ' ' +
                (overLap.end ? 'overlap-end' : ''), ref: eventRef, onMouseDown: e => {
                e.preventDefault();
                mouseDownRef.current = true;
            }, onMouseUp: e => {
                e.preventDefault();
                mouseDownRef.current = false;
            }, onMouseMove: () => {
                // e.stopPropagation();
                //  e.preventDefault();
                if (mouseDownRef.current) {
                    handleDragStart();
                }
            }, onClick: e => {
                if (isResizing)
                    return;
                e.stopPropagation();
                e.preventDefault();
                dragEnd();
                calenderToAddOrUpdateEvent(eventObj);
            }, 
            // onMouseDown={e => {
            //   mouseDownRef.current = true;
            //   setTimeout(() => {
            //     if (mouseDownRef.current) {
            //       handleDragStart(e);
            //     }
            //     mouseDownRef.current = false;
            //   }, 100);
            // }}
            // onClick={e => {
            //   e.stopPropagation();
            //   e.preventDefault();
            //   if (mouseDownRef.current) {
            //     dragEnd();
            //     calenderToAddOrUpdateEvent(eventObj);
            //   }
            //   mouseDownRef.current = false;
            //   // mouseDownRef.current = 0;
            // }}
            // onMouseUp={handleMouseUpDrag}
            style: eventStyle }, { children: jsxs("div", Object.assign({ className: "ib__sc__event-box ib__sc__event-box-month", style: eventBoxStyle }, { children: [overLap && !overLap.start && (jsx("div", Object.assign({ style: isResizing ? { display: 'flex' } : {}, className: "dragging-handler-month left", onMouseDown: e => {
                            handleMouseDownResize(e, 'left');
                        } }, { children: "||" }))), jsx(EventBoxView, { eventObj: eventObj, 
                        // eventHeight={eventHeight}
                        ///  overLap={overLap}
                        // isCalender={isCalender}
                        isShowTitle: !overLap.start, isStart: !overLap.start }), overLap && !overLap.end && (jsx("div", Object.assign({ style: isResizing ? { display: 'flex' } : {}, className: "dragging-handler-month right", onMouseDown: e => {
                            handleMouseDownResize(e, 'right');
                        } }, { children: "||" })))] })) }))) }));
};

function DayCellMonth({ currentBoxHeight, eventsInDay, boxHeight, boxDay, day, dragingEventId, resizingEventId, calenderToAddOrUpdateEvent, dragBoxMouseEnterToCell, }) {
    const BoxRef = useRef(null);
    /**
     * Handle event while eneter in box
     * @param {React.MouseEvent<HTMLTableCellElement>} e
     */
    const dragMouseEnter = (e) => {
        e.preventDefault();
        console.log("boxDay", boxDay);
        dragBoxMouseEnterToCell(new Date(boxDay));
    };
    const handleClickBox = (e) => {
        e.preventDefault();
        e.stopPropagation();
        calenderToAddOrUpdateEvent({
            startTime: new Date(boxDay).setHours(0, 0, 0, 0),
            endTime: new Date(boxDay + 24 * HOUR_MILLISECONDS).setHours(0, 0, 0, 0),
        });
    };
    /**
     * Add event listener on mouse enter
     */
    useEffect(() => {
        var _a;
        if (!BoxRef.current)
            return;
        if (dragingEventId === undefined && resizingEventId === undefined)
            return;
        (_a = BoxRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', dragMouseEnter, true);
        return () => {
            var _a;
            (_a = BoxRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseenter', dragMouseEnter, true);
        };
    }, [dragingEventId, resizingEventId]);
    return (jsx("td", Object.assign({ ref: BoxRef, className: " ib__sc__table-td ib__sc__table-td-month", onClick: handleClickBox }, { children: jsxs("div", Object.assign({ className: "ib__sc_month_cell", style: { minHeight: `${currentBoxHeight + 20}px` } }, { children: [jsx("div", Object.assign({ className: "ib__sc_month_cell_wrapper" }, { children: jsx("span", Object.assign({ className: "ib__sc_month_day" }, { children: day })) })), jsx("div", Object.assign({ className: "ib__sc__table-td__day_cell", style: { minHeight: `${currentBoxHeight}px` } }, { children: eventsInDay.map((event, key) => (jsx(EventBoxMonth, { eventObj: event, boxHeight: boxHeight, boxTime: 1, boxDay: boxDay, isDraging: dragingEventId === event.sc_app__id, isResizing: resizingEventId === event.sc_app__id, isCalender: true }, key))) }))] })) })));
}

function CalenderMonth({ currentDay = new Date(), eventsData, updateEvent, calenderType, startingWeekday, monthCalenderDayHeight, isShowAddNewEventButton = true, dayStartFrom, monthCalenderTitleFormate, monthCalenderTitle, calenderHeight, minimumEventThickness, calenderToAddOrUpdateEvent, monthCalenderMinCellHeight: boxHeight = 60, handleNextClick: _handleNextClick, handlePrevClick: _handlePrevClick, handleChangeCurrentDate: _handleChangeCurrentDate, 
//fromDate = new Date(),
handleClanderTypeChange, }) {
    const [selectedDate, setSelectedDate] = useState(currentDay);
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const yearMonth = `${year}-${(month + 1).toString().padStart(2, '0')}`;
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const [events, setEvents] = useState(calculatePositions(eventsData, true));
    const currentDragDate = useRef();
    const editingEventRef = useRef();
    const [isDraging, setIsDraging] = useState(false);
    const sideUseRef = useRef('');
    if (!boxHeight) {
        if (calenderHeight) {
            boxHeight = calenderHeight / 5;
        }
        else {
            boxHeight = 50;
        }
    }
    /**
     * set current day
     */
    React.useEffect(() => {
        if (!currentDay)
            return;
        setSelectedDate(currentDay);
    }, [currentDay]);
    /**
     * set event id for events
     */
    useEffect(() => {
        setEvents(calculatePositions(
        //convertToComponentEventFormat(setEventID(eventsData), 'dd/MM/yyyy'),
        eventsData, true));
    }, [eventsData]);
    /**
     *   remove text selection while mouse  dragining
     */
    useEffect(() => {
        if (!isDraging)
            return;
        document.body.style.userSelect = 'none';
        return () => {
            document.body.style.userSelect = 'auto';
        };
    }, [isDraging]);
    /**
     *
     * @param {Event} event
     * @param {Number} selectedDate
     */
    const dragStart = (event, selectedDate) => {
        console.log('dragStart');
        console.log(event);
        currentDragDate.current = selectedDate;
        editingEventRef.current = Object.assign(Object.assign({}, event), { left: 0, width: '100' });
        setIsDraging(true);
    };
    /**
     *
     * @param {Event} event
     * @param {Number} date
     * @param {string} side
     */
    const resizeStart = (event, date, side) => {
        currentDragDate.current = date;
        editingEventRef.current = Object.assign(Object.assign({}, event), { left: 0, width: '100' });
        sideUseRef.current = side;
        setIsDraging(true);
    };
    /** Update dragging event on mouse enter
     * @param {e} Event object
     * @return {undefined}
     * */
    const dropHandler = (e) => {
        if (e) {
            e.preventDefault();
        }
        sideUseRef.current = '';
        if (editingEventRef.current) {
            updateEvent(Object.assign({}, editingEventRef.current));
            editingEventRef.current = null;
        }
        setIsDraging(false);
        // document.removeEventListener('mousemove', dragingMouseMoveHandler);
    };
    const findAndSetEvent = (event, events) => {
        const index = events.findIndex((e) => e.sc_app__id === event.sc_app__id);
        // alert(index);
        if (index > -1) {
            events[index] = event;
            setEvents([...events]);
        }
    };
    const dragBoxMouseEnterToCell = (date) => {
        if (!editingEventRef.current)
            return;
        if (!currentDragDate.current)
            return;
        const newEvent = editingEventRef.current;
        const daysDiff = getDaysDifference(date, new Date(currentDragDate.current));
        if (daysDiff === 0)
            return;
        if (sideUseRef.current === 'left') {
            newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
        }
        else if (sideUseRef.current === 'right') {
            newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
        }
        else {
            newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
            newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
        }
        editingEventRef.current = newEvent;
        currentDragDate.current = date.getTime();
        findAndSetEvent(newEvent, events);
    };
    const renderDaysOfWeek = () => {
        return (jsx("tr", { children: weekdaysArr.map((day, index) => (jsx("th", Object.assign({ className: "ib__sc__table-th" }, { children: weekdaysArr[(index + startingWeekday) % 7] }), day))) }));
    };
    /**
     * Render calendar days
     */
    const renderCalendarDays = () => {
        var _a;
        const rows = [];
        let cells = [];
        for (let i = 0; i < Math.abs(firstDayOfMonth + 7 - startingWeekday) % 7; i++) {
            cells.push(jsx("td", Object.assign({ className: "ib__sc__table-td ib__sc__table-td-month " }, { children: jsx("div", Object.assign({ className: "ib__sc__table-td__day_cell" }, { children: " " })) }), `empty-${i}`));
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            let minPercentage = 100;
            const eventsInDay = events.filter((event) => {
                // console.log( 'event.width',event.width)
                if (event.startTime && event.endTime && event.width && isDateBetween(date, event.startTime, event.endTime)) {
                    minPercentage = Math.min(minPercentage, event.width);
                    return true;
                }
                else {
                    return false;
                }
            });
            let currentBoxHeight = boxHeight;
            if ((minPercentage * boxHeight) / 100 < minimumEventThickness) {
                currentBoxHeight = (minimumEventThickness * 100) / minPercentage;
            }
            cells.push(jsx(DayCellMonth, { 
                // isDraging={isDraging}
                currentBoxHeight: currentBoxHeight, eventsInDay: eventsInDay, dragBoxMouseEnterToCell: dragBoxMouseEnterToCell, calenderToAddOrUpdateEvent: calenderToAddOrUpdateEvent, dragingEventId: editingEventRef.current
                    ? (_a = editingEventRef.current) === null || _a === void 0 ? void 0 : _a.sc_app__id
                    : undefined, resizingEventId: editingEventRef.current && sideUseRef.current
                    ? editingEventRef.current.sc_app__id
                    : undefined, boxHeight: boxHeight, boxDay: new Date(date).getTime(), day: i }, i));
            if (cells.length === 7) {
                rows.push(jsx("tr", Object.assign({ className: "ib__sc__table-td ib__sc__table-td-month" }, { children: cells }), i));
                cells = [];
            }
        }
        if (cells.length > 0) {
            for (let i = cells.length; i < 7; i++) {
                cells.push(jsx("td", {}, `empty-${i}`));
            }
            rows.push(jsx("tr", { children: cells }, daysInMonth));
        }
        return rows;
    };
    /**
     * Next and prev month
     * @param {number} value
     */
    const onmonthChangeNextPrev = (value) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + value);
        setSelectedDate(newDate);
        if (value > 0) {
            typeof _handleNextClick === 'function' &&
                _handleNextClick(newDate, calenderType);
        }
        else {
            typeof _handlePrevClick === 'function' &&
                _handlePrevClick(newDate, calenderType);
        }
    };
    /**
     * Select month
     * @param {} e
     */
    const selectMonth = (e) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
        typeof _handleChangeCurrentDate === 'function' &&
            _handleChangeCurrentDate(newDate, calenderType);
    };
    console.log('render eventsData', eventsData);
    return (jsx("div", { children: jsx(EventHandlerContex.Provider, Object.assign({ value: {
                dragStart,
                resizeStart: resizeStart,
                updateEvent: updateEvent,
                calenderToAddOrUpdateEvent,
                dragEnd: dropHandler,
                resizeEnd: dropHandler,
            } }, { children: jsxs("div", Object.assign({ className: 'ib__sc__table ib__sc__table-month-wrap ib_sc_type_' + calenderType }, { children: [jsx("div", Object.assign({ className: "ib__sc__header_wrapper" }, { children: jsxs("div", Object.assign({ className: "ib__sc__header" }, { children: [jsx("div", Object.assign({ className: "ib__sc__header__date-switch" }, { children: jsx("div", Object.assign({ className: "ib__sc__month-date" }, { children: jsxs("div", Object.assign({ className: "ib__sc__month-date-btn-group" }, { children: [jsx("button", Object.assign({ className: "ib__sc__month-date__bt-prev ib__sc__np__btn", onClick: () => onmonthChangeNextPrev(-1) }, { children: jsx(LeftIcon, {}) })), jsx("span", Object.assign({ className: "ib__sc__month-date__bt-text" }, { children: jsx("input", { type: "month", className: "ib__sc-form-control", placeholder: "yyyy-mm", onChange: selectMonth, value: yearMonth }) })), jsx("button", Object.assign({ className: "ib__sc__month-date__bt-next ib__sc__np__btn", onClick: () => onmonthChangeNextPrev(1) }, { children: jsx(RightIcon, {}) }))] })) })) })), jsx("div", { className: "ib__sc__header__center" }), jsxs("div", Object.assign({ className: "ib__sc__header__right" }, { children: [isShowAddNewEventButton && jsx("div", Object.assign({ className: "ib__sc__header__right__btn-group" }, { children: jsx("button", Object.assign({ className: "ib__sc__btn", onClick: () => { calenderToAddOrUpdateEvent({}); } }, { children: "Add Event" })) })), jsx(CalendarSwitch, { calenderType: calenderType, handleClanderTypeChange: handleClanderTypeChange })] }))] })) })), jsx("div", { style: { position: 'relative', display: 'flex' } }), jsx("div", Object.assign({ className: "calendar" }, { children: jsxs("table", Object.assign({ className: "ib__sc__table-month", border: 0, cellSpacing: "0", cellPadding: "0" }, { children: [jsx("thead", { children: renderDaysOfWeek() }), jsx("tbody", { children: renderCalendarDays() })] })) }))] })) })) }));
}

var css_248z = "body {\r\n  margin: 0;\r\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\r\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\r\n    sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.ib__sc__form-group {\r\n  margin-bottom: 1em;\r\n}\r\n\r\n.ib__sc-form-control {\r\n  display: block;\r\n    padding: 0.375rem 0.75rem;\r\n    font-weight: 100;\r\n    width: 100%;\r\n    border: 1px solid #ccc;\r\n    border-radius: 4px;\r\n    line-height: 1.5;\r\n    color: #5b5b5b;\r\n    background-color: #fff;\r\n    background-clip: padding-box;\r\n    appearance: none;\r\n    box-sizing: border-box;\r\n    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\r\n}\r\n\r\n.ib__sc__btn {\r\n  color: #5b5b5b;\r\n  background-color: #e0e0e0;\r\n  border-color: #9e9e9e;\r\n  display: inline-block;\r\n  font-weight: bold;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: middle;\r\n  -webkit-user-select: none;\r\n  user-select: none;\r\n  border: 1px solid transparent;\r\n  padding: 0.375rem 0.75rem;\r\n  font-size: .8em;\r\n  line-height: 1.2em;\r\n  border-radius: 3px;\r\n  cursor: pointer;\r\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\r\n}\r\n\r\n.ib__sc__btn.active {\r\n  background-color: #b6b6b6;\r\n  border-color: #adadad;\r\n}\r\n.ib__sc__btn:hover {\r\n  background-color: #b6b6b6;\r\n  border-color: #adadad;\r\n}\r\n.ib__sc__btn-group {\r\n  flex-wrap: wrap;\r\n  align-items: stretch;\r\n  width: 100%;\r\n  display: table-cell;\r\n  border-radius: 0.25rem;\r\n  overflow: hidden;\r\n}\r\n.ib__sc__btn-group .ib__sc__btn {\r\n  border-radius: 0;\r\n}\r\n.ib__sc__btn-group .ib__sc__btn {\r\n  border-left: 1px solid #ccc;\r\n}\r\n.ib__sc__btn-group .ib__sc__btn:first-child {\r\n  border-top-left-radius: 0.25rem;\r\n  border-bottom-left-radius: 0.25rem;\r\n  border-left: none;\r\n}\r\n\r\n.ib__sc__btn-group .ib__sc__btn:last-child {\r\n  border-top-right-radius: 0.25rem;\r\n  border-bottom-right-radius: 0.25rem;\r\n}\r\n\r\n.ib__sc__truncate {\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.ib__sc__flex_center {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n/* Ib table */\r\n.ib__sc__table {\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\r\n    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.ib__sc__header {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 6px;\r\n  box-sizing: border-box;\r\n}\r\n.ib__sc__header__right {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n.ib__sc__header__right__btn-group {\r\n  display: flex;\r\n  align-items: center;\r\n  margin-right: 1em;\r\n  font-size: .8em;\r\n}\r\n.ib__sc__np__btn {\r\n  border: none;\r\n  outline: 0;\r\n  background: transparent;\r\n  cursor: pointer;\r\n  display: flex;\r\n  opacity: 0.5;\r\n  align-items: center;\r\n  width: 24px;\r\n}\r\n.ib__sc__calander_switch {\r\n  font-size: .8em;\r\n}\r\n\r\n.ib__sc__table-out-week {\r\n  display: flex;\r\n  width: 100%;\r\n  overflow-y: scroll;\r\n}\r\n.ib__sc__table-out-week::-webkit-scrollbar {\r\n  width: 0.4em;\r\n  border-radius: 1em;\r\n}\r\n\r\n.ib__sc__table-out-week::-webkit-scrollbar-track {\r\n  box-shadow: inset 0 0 6px rgba(154, 154, 154, 0.3);\r\n  border-radius: 0.3em;\r\n}\r\n\r\n.ib__sc__table-out-week::-webkit-scrollbar-thumb {\r\n  background-color: rgb(211, 211, 211);\r\n  outline: 1px solid rgb(173, 181, 190);\r\n}\r\n.ib__sc__week-date {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n.ib__sc__week-date-btn-group {\r\n  display: flex;\r\n  justify-content: center;\r\n\r\n  border-radius: 4px;\r\n}\r\n.ib__sc__week-date-btn-group {\r\n  border: 1px solid #eeeeee;\r\n}\r\n\r\n.ib__sc__week-date__bt-text .ib__sc-form-control {\r\n  width: auto;\r\n  border: none;\r\n  border-left: 1px solid #eeeeee;\r\n  border-radius: 0;\r\n  border-right: 1px solid #eeeeee;\r\n}\r\n\r\n.ib__sc__table-week {\r\n  border-spacing: 0;\r\n  z-index: 1003;\r\n  margin-bottom: 100px;\r\n}\r\n\r\n.ib__sc__table-td-week {\r\n  position: relative;\r\n  flex: 1 1;\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  border: none;\r\n  margin-left: -1px;\r\n}\r\n\r\n.ib__sc__table-hr-box-week {\r\n  background: #ffffff;\r\n  border-top: 1px dashed #dbdbdb;\r\n  margin-top: -1px;\r\n  cursor: pointer;\r\n}\r\n.ib__sc__table-hr-box-week:hover {\r\n  background: #eff1ff;\r\n}\r\n\r\n.ib__sc__tb_week_time .ib__sc__table-hr-box-week {\r\n  border-top: 1px solid #fff;\r\n}\r\n.ib__sc__tb_week_time .ib__sc__cell {\r\n  border: none;\r\n}\r\n.ib__sc__tb_week_time .ib__sc__table-hr-box-week small {\r\n  margin-top: -1em;\r\n}\r\n.ib__sc__time_title {\r\n  margin-top: -0.5em;\r\n  display: block;\r\n}\r\n.ib__sc__table-th {\r\n  text-align: center;\r\n  top: 0;\r\n  position: sticky;\r\n  z-index: 1001;\r\n  padding: 8px;\r\n  background: #fff;\r\n  border: 1px solid #ccc;\r\n  color: #4e4e4e;\r\n  height: 1.6em;\r\n  line-height: 1.6em;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 12px;\r\n  /* display: table-cell; */\r\n  vertical-align: middle;\r\n}\r\n.ib__sc__table-th-week {\r\n  border: 1px solid #000;\r\n  text-align: center;\r\n}\r\n\r\n.ib__sc__tb-wrapper-week {\r\n  display: flex;\r\n  width: 100%;\r\n}\r\n\r\n.ib__sc__increment-timespan .ib__sc__btn {\r\n  line-height: 21px;\r\n  text-align: center;\r\n  padding: 1px 8px;\r\n}\r\n.ib__sc__cell {\r\n  border: 1px dashed #ccc;\r\n}\r\n.ib__sc__cell-wrapper {\r\n  position: relative;\r\n  margin: 0px;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.ib__sc__event-wrapper {\r\n  position: absolute;\r\n  overflow: hidden;\r\n}\r\n.ib__sc__event {\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  text-align: left;\r\n  padding: 5px 10px 0px 5px;\r\n}\r\n.ib__sc__event-box {\r\n  padding: 0px;\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  border: 2px solid #ffffff;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.ib__sc__staring_event_box::before {\r\n  content: '';\r\n  display: block;\r\n  width: 5px;\r\n  top: 0px;\r\n  bottom: 0px;\r\n  background-color: #ccc;\r\n  position: absolute;\r\n  left: 0;\r\n}\r\n.dragging-handler-week {\r\n  text-align: center;\r\n  display: none;\r\n}\r\n\r\n.ib__sc__event-box:hover .dragging-handler-week {\r\n  display: block;\r\n}\r\n.dragging-handler-week {\r\n  position: absolute;\r\n  cursor: re-resize;\r\n  left: 1px;\r\n  right: 1px;\r\n  height: 12px;\r\n  z-index: 100;\r\n  background: #ededed;\r\n  line-height: 10px;\r\n  color: #777;\r\n  opacity: 0.8;\r\n}\r\n\r\n.dragging-handler-week.top {\r\n  cursor: s-resize;\r\n  top: 0px;\r\n}\r\n.dragging-handler-week.bottom {\r\n  cursor: s-resize;\r\n  bottom: 0px;\r\n}\r\n\r\n.resize-event-bg {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  right: 0px;\r\n  bottom: 0px;\r\n  background: rgb(139 139 139 / 27%);\r\n  opacity: 1;\r\n  z-index: 100;\r\n}\r\n\r\n.placeholder {\r\n  /* display: none; */\r\n  cursor: move;\r\n  cursor: grab;\r\n  position: absolute;\r\n  pointer-events: none;\r\n  border: 1px dashed black;\r\n  background: red;\r\n}\r\n\r\n.ib__sc__daybar-week {\r\n  width: 100%;\r\n  height: 2px;\r\n  position: absolute;\r\n  background: #03a9f4;\r\n  z-index: 1004;\r\n}\r\n\r\n.ib__sc__week-time {\r\n  font-size: 0.7em;\r\n  text-align: right;\r\n  line-height: 1em;\r\n  color: #373737;\r\n  width: 72px;\r\n  margin-top: -1px;\r\n  padding-right: 3px;\r\n  border-top: 1px dashed transparent;\r\n}\r\n\r\n/* Add Event popup */\r\n\r\n.ib__sc-modal {\r\n  position: fixed;\r\n  z-index: 1100;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: auto;\r\n  /* display: none; */\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ib__sc-modal-content {\r\n  background-color: white;\r\n  padding: 20px;\r\n  width: 90%;\r\n  border-radius: 5px;\r\n  max-width: 400px;\r\n  position: relative;\r\n}\r\n.ib__sc__close-modal-btn {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  line-height: 20px;\r\n  height: 20px;\r\n  width: 20px;\r\n  font-weight: 700;\r\n  font-size: 24px;\r\n  background: white;\r\n  text-align: center;\r\n  color: #ccc;\r\n  cursor: pointer;\r\n}\r\n.ib__sc__modal_footer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.ib__sc-form-control:focus {\r\n  color: #212529;\r\n  background-color: #fff;\r\n  border-color: #adadad;\r\n  outline: 0;\r\n}\r\n\r\n.ib__sc__form-time-row {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.ib__sc__form-time-row > * + * {\r\n  margin-left: 10px;\r\n}\r\n\r\n.ib__sc-label {\r\n  font-size: 13px;\r\n  margin-bottom: 5px;\r\n  text-transform: capitalize;\r\n}\r\n\r\n/* Month Calender */\r\n.ib__sc__table-out-week {\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  -khtml-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.ib__sc__table-month {\r\n  border-spacing: 0;\r\n  z-index: 1003;\r\n  width: 100%;\r\n}\r\n.ib__sc__table-td-month {\r\n  text-align: left;\r\n  padding-left: 0;\r\n  position: relative;\r\n}\r\n.ib__sc__table-td__day_cell {\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n  height: 100%;\r\n  position: relative;\r\n}\r\n.ib__sc_month_cell {\r\n  position: relative;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n.ib__sc_month_cell:hover {\r\n  background: #eff1ff;\r\n}\r\n\r\n.ib__sc_month_day {\r\n  color: #b3b3b3;\r\n  font-weight: 600;\r\n  font-size: .8em;\r\n  line-height: .8em;\r\n  padding: 5px;\r\n  z-index: 1000;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\ntable.ib__sc__table-month {\r\n  border: none;\r\n  border-collapse: collapse;\r\n}\r\ntable.ib__sc__table-month td {\r\n  border-right: 1px solid #dfdfdf;\r\n  vertical-align: top;\r\n}\r\ntable.ib__sc__table-month td:first-child {\r\n  border-left: 1px solid #dfdfdf;\r\n}\r\ntable.ib__sc__table-month tr {\r\n  border-bottom: 1px solid #dfdfdf;\r\n}\r\n\r\n.ib__sc__month-date {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n.ib__sc__month-date-btn-group {\r\n  display: flex;\r\n  justify-content: center;\r\n  border: 1px solid #e8e8e8;\r\n  border-radius: 4px;\r\n}\r\n\r\n.ib__sc__month-date__bt-text .ib__sc-form-control {\r\n  width: auto;\r\n  border: none;\r\n}\r\n\r\n.dragging-handler-month {\r\n  position: absolute;\r\n\r\n  top: 1px;\r\n  bottom: 1px;\r\n  width: 12px;\r\n  z-index: 100;\r\n\r\n  line-height: 10px;\r\n  color: #777;\r\n  font-size: 0.5em;\r\n  align-items: center;\r\n  opacity: 0.8;\r\n  display: none;\r\n  justify-content: center;\r\n}\r\n\r\n.dragging-handler-month.left {\r\n  cursor: w-resize;\r\n  left: 0px;\r\n}\r\n.dragging-handler-month.right {\r\n  cursor: w-resize;\r\n  right: 0px;\r\n}\r\n\r\n.ib__sc__event-box:hover .dragging-handler-month {\r\n  display: flex;\r\n}\r\n.dragging .dragging-handler-month {\r\n  display: flex;\r\n}\r\n.dragging-handler-month:hover {\r\n  display: flex;\r\n}\r\n.ib__sc__event-wrapper.dragging {\r\n  z-index: 3003;\r\n}\r\n.ib__sc__event-wrapper-month.overlap-start {\r\n  left: -1px !important;\r\n}\r\n.ib__sc__event-wrapper-month.overlap-end {\r\n  width: calc(100% + 2px) !important;\r\n}\r\n\r\n.ib__sc__event-wrapper-month.overlap-start .ib__sc__event-box {\r\n  border-top-left-radius: 0;\r\n  border-bottom-left-radius: 0;\r\n  border-left: 0;\r\n}\r\n\r\n.ib__sc__event-wrapper-month.overlap-end .ib__sc__event-box {\r\n  border-top-right-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n  border-right: 0;\r\n}\r\n\r\n.ib__sc__np__btn img{\r\n  width: 100%;\r\n}";
styleInject(css_248z);

function ReactCalendarScheduler({ selectedDate = new Date(), calenderType: _calenderType = 'week', // week or day
monthCalenderTitleFormate = 'dddd', //month title format
monthCalenderTitle = 'ddd', //day column title format
monthCalenderDayHeight = 120, //day column height
minimumEventThickness = 30, //minimum event thickness
calenderHeight = 600, //calender height
weekHourBoxHeight: _weekHourBoxHeight = 50, weekCalenderNextBtnDayIncrement = 7, //day increment on next button click
startingWeekday = 1, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
weekCalenderDayStartFromHour = 7, //day start from hour,
weekCalenderVisibleHour = 12, //day visible hour
weekCalenderTitleFormate = 'ddd, MMM dd', //day column title format
weekCalenderTimeFormate = 12, //day column title format
monthCalenderMinCellHeight = 50, //minimum cell height
disabaleEventPopup = false, //disable event popup
isShowAddNewEventButton, //show add new event button
disabaleAddEventPopup = false, //disable add event popup
handleUpdateEvent: _handleUpdateEvent, //update event
handleAddNewEvent: _handleAddNewEvent, //add new event
handleDeleteEvent: _handleDeleteEvent, //delete event
handleEventClick: _handleEventClick, //event click
handleColumnClick: _handleColumnClick, //column click
handleNextClick: _handleNextClick, //next button click
handlePrevClick: _handlePrevClick, //prev button click
handleClanderTypeChange: _handleClanderTypeChange, //calender type change
handleChangeCurrentDate: _handleChangeCurrentDate, //change current date
handleIncreaseTimeSpan: _handleIncreaseTimeSpan, //increase time span
events, }) {
    /**
     * set event id for events
     */
    const [isShowAddEvent, setIsShowAddEvent] = useState(false);
    const [eventEdit, setEventEdit] = useState({
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
    });
    const [calenderType, setCalenderType] = useState(_calenderType);
    const [eventsState, setEventsState] = useState(setEventID(events));
    const [weekHourBoxHeight, setWeekHourBoxHeight] = useState(_weekHourBoxHeight);
    React.useEffect(() => {
        setEventsState(setEventID(events));
    }, [events]);
    /**
     * update event while dragging or resizing
     * @param {EventObject} eventObj
     */
    const updateEventDrag = (eventObj) => {
        const index = eventsState.findIndex(event => event.sc_app__id === eventObj.sc_app__id);
        const newEvent = convertToOutputEventFormat(eventObj);
        if (newEvent.startDate !== eventsState[index].startDate ||
            newEvent.endDate !== eventsState[index].endDate ||
            newEvent.startTime !== eventsState[index].startTime ||
            newEvent.endTime !== eventsState[index].endTime) {
            eventsState[index] = newEvent;
            typeof _handleUpdateEvent === 'function' &&
                _handleUpdateEvent(eventsState[index]);
            setEventsState([...eventsState]);
        }
    };
    /**
     * open add event modal
     * @param {EventObject} eventObjEdit
     */
    const calenderToAddOrUpdateEvent = (eventObjEdit) => {
        if (eventObjEdit.sc_app__id) {
            typeof _handleEventClick === 'function' &&
                _handleEventClick(convertToOutputEventFormat(eventObjEdit));
        }
        else {
            typeof _handleColumnClick === 'function' &&
                _handleColumnClick(convertToOutputEventFormat(eventObjEdit));
        }
        if (!disabaleEventPopup && !disabaleAddEventPopup) {
            setEventEdit(Object.assign(Object.assign({}, convertToOutputEventFormat(eventObjEdit)), { startDate: eventObjEdit.startTime
                    ? formatDate(new Date(eventObjEdit.startTime), 'yyyy-MM-dd')
                    : '', endDate: eventObjEdit.endTime
                    ? formatDate(new Date(eventObjEdit.endTime), 'yyyy-MM-dd')
                    : '', startTime: eventObjEdit.startTime
                    ? formatDate(new Date(eventObjEdit.startTime), 'H:mm:ss')
                    : '', endTime: eventObjEdit.endTime
                    ? formatDate(new Date(eventObjEdit.endTime), 'H:mm:ss')
                    : '' }));
            setIsShowAddEvent(true);
        }
    };
    /**
     * handle add or update event
     * @param {EventObject} eventObj
     */
    const handleUpdateOrUpdateEvent = (eventObj) => {
        if (eventObj.sc_app__id) {
            for (let i = 0; i < eventsState.length; i++) {
                if (eventsState[i].sc_app__id === eventObj.sc_app__id) {
                    eventsState[i] = Object.assign({}, eventObj);
                    break;
                }
            }
            typeof _handleUpdateEvent === 'function' && _handleUpdateEvent(eventObj);
        }
        else {
            eventObj.sc_app__id = new Date().getTime();
            typeof _handleAddNewEvent === 'function' && _handleAddNewEvent(eventObj);
            eventsState.push(eventObj);
        }
        setEventsState([...eventsState]);
        setIsShowAddEvent(false);
    };
    /**
     * handle delete event
     * @param {Number} sc_app__id
     */
    const handleDeleteEvent = (sc_app__id) => {
        const index = eventsState.findIndex(event => event.sc_app__id === sc_app__id);
        _handleDeleteEvent && _handleDeleteEvent(Object.assign({}, eventsState[index]));
        eventsState.splice(index, 1);
        setEventsState([...eventsState]);
        setIsShowAddEvent(false);
    };
    /**
     * handle calendar type change
     * @param {string} type
     */
    const handleClanderTypeChange = (type) => {
        setCalenderType(type);
        _handleClanderTypeChange && _handleClanderTypeChange(type);
    };
    const handleIncreaseTimeSpan = (diff) => {
        if (weekHourBoxHeight + diff < 20) {
            return;
        }
        setWeekHourBoxHeight(weekHourBoxHeight + 10 * diff);
        _handleIncreaseTimeSpan && _handleIncreaseTimeSpan();
    };
    return (jsx("div", Object.assign({ className: "App react-calender-scedule" }, { children: jsxs("div", Object.assign({ className: "ib__sc_rcs-container" }, { children: [(calenderType === 'week' || calenderType === 'day') && (jsx(CalendarWeek, { eventsData: convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy'), selectedDate: selectedDate, calenderType: calenderType, weekHourBoxHeight: weekHourBoxHeight, handleIncreaseTimeSpan: handleIncreaseTimeSpan, startingWeekday: startingWeekday, weekCalenderDayStartFromHour: weekCalenderDayStartFromHour, weekCalenderVisibleHour: weekCalenderVisibleHour, weekCalenderTitleFormate: weekCalenderTitleFormate, weekCalenderTimeFormate: weekCalenderTimeFormate, minimumEventThickness: minimumEventThickness, handleNextClick: _handleNextClick, calenderHeight: calenderHeight, handlePrevClick: _handlePrevClick, weekCalenderNextBtnDayIncrement: weekCalenderNextBtnDayIncrement > 7
                        ? 7
                        : weekCalenderNextBtnDayIncrement, isShowAddNewEventButton: isShowAddNewEventButton, noOfDayColumn: calenderType === 'week' ? 7 : 1, handleChangeCurrentDate: _handleChangeCurrentDate, handleClanderTypeChange: handleClanderTypeChange, updateEvent: updateEventDrag, calenderToAddOrUpdateEvent: (eventObj) => {
                        calenderToAddOrUpdateEvent(eventObj);
                    } })), calenderType === 'month' && (jsx(CalenderMonth, { eventsData: convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy'), monthCalenderDayHeight: monthCalenderDayHeight, selectedDate: selectedDate, dayStartFrom: 0, calenderType: calenderType, startingWeekday: startingWeekday, isShowAddNewEventButton: isShowAddNewEventButton, currentDay: selectedDate, calenderHeight: calenderHeight, monthCalenderMinCellHeight: monthCalenderMinCellHeight, minimumEventThickness: minimumEventThickness, monthCalenderTitleFormate: monthCalenderTitleFormate, monthCalenderTitle: monthCalenderTitle, handleChangeCurrentDate: _handleChangeCurrentDate, updateEvent: updateEventDrag, handleClanderTypeChange: handleClanderTypeChange, calenderToAddOrUpdateEvent: (eventObj) => {
                        calenderToAddOrUpdateEvent(eventObj);
                    } })), isShowAddEvent && (jsx(AddEventModal, { show: isShowAddEvent, handleClose: () => {
                        setIsShowAddEvent(false);
                    }, handleDeleteEvent: handleDeleteEvent, handleAddEvent: handleUpdateOrUpdateEvent, eventObj: eventEdit }))] })) })));
}

export { ReactCalendarScheduler };
//# sourceMappingURL=index.esm.js.map
