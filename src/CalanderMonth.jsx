import React, { useEffect, useRef, useState } from 'react';
import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import DayCellMonth from './DayCellMonth';
import { LeftIcon, RightIcon } from './_svg_icon';
import {
  calculatePositions,
  getDaysDifference,
  isDateBetween,
  parseEvents,
  setEventID,
} from './_utils';
//let maxEventCountInDay = 0;

const boxHeight = 60;
const minimumThinkness = 25;
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = [
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

function CalanderMonth({ currentDay, eventsData, updateEvent }) {
  console.log('currentDay', currentDay);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log('selectedDate', selectedDate);
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [events, setEvents] = useState(eventsData);

  const currentDragDate = useRef();
  const editingEventRef = useRef();
  //const lastCleintYRef = useRef(0);
  const [isDraging, setIsDraging] = useState(false);
  const sideUseRef = useRef('');
  //const [dragingEventId, setDragingEventId] = useState(null);

  useEffect(() => {
    if (!currentDay) return;
    setSelectedDate(currentDay);
  }, [currentDay]);

  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(eventsData), 'dd/MM/yyyy', 'HH:mm:ss'),
      ),
    );
  }, [eventsData]);

  useEffect(() => {
    if (!isDraging) return;
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.userSelect = 'auto';
    };
  }, [isDraging]);

  const dragStart = (event, selectedDate) => {
    console.debug('dragStart2222222222222222222222222222', selectedDate);
    currentDragDate.current = selectedDate;

    editingEventRef.current = { ...event, left: 0, width: '100' };
    // setDragingEventId(event.sc_app__id);
    setIsDraging(true);
    //setDraggingEvent({ ...event, left: 0, width: '100%' });
  };

  const resizeStart = (event, date, side) => {
    console.debug('resizeStart000000000000000000000000000000000000000000');
    currentDragDate.current = date;
    editingEventRef.current = { ...event, left: 0, width: '100' };
    // setDragingEventId(event.sc_app__id);
    sideUseRef.current = side;
    setIsDraging(true);
    //setDraggingEvent({ ...event, left: 0, width: '100%' });
  };

  /** Update dragging event on mouse enter
   * @param {e} Event object
   * @return {undefined}
   * */
  const dropHandler = e => {
    if (e) {
      e.preventDefault();
    }
    sideUseRef.current = '';
    if (editingEventRef.current) {
      updateEvent(editingEventRef.current);

      editingEventRef.current = null;
    }
    setIsDraging(false);
    // document.removeEventListener('mousemove', dragingMouseMoveHandler);
  };

  const dragBoxMouseEnterToCell = date => {
    if (!editingEventRef.current) return;

    const newEvent = editingEventRef.current;

    let daysDiff = getDaysDifference(date.getTime(), currentDragDate.current);
    console.log(
      'daysDiff9999999999999999999999',
      newEvent,
      daysDiff,
      date.getTime(),

      currentDragDate.current,
      new Date(newEvent.endTime),
    );
    if (daysDiff === 0) return;
    console.log('daysDiff', daysDiff);
    console.log(' sideUseRef.current', sideUseRef.current);

    if (sideUseRef.current === 'left') {
      newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
    } else if (sideUseRef.current === 'right') {
      newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
    } else {
      newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
      newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
    }
    editingEventRef.current = newEvent;
    console.log('newEvent.endTime ', new Date(newEvent.endTime));
    currentDragDate.current = date.getTime();

    for (let i = 0; i < events.length; i++) {
      if (events[i].sc_app__id === newEvent.sc_app__id) {
        events[i] = newEvent;
        break;
      }
    }
    setEvents([...events]);

    // updateEvent(newEvent);
  };
  const renderDaysOfWeek = () => {
    return (
      <tr>
        {daysOfWeek.map(day => (
          <th className="ib__sc__table-th" key={day}>
            {day}
          </th>
        ))}
      </tr>
    );
  };

  const renderCalendarDays = () => {
    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(
        <td
          className="ib__sc__table-td ib__sc__table-td-month "
          key={`empty-${i}`}
        >
          <div className="ib__sc__table-td__day_cell"> </div>
        </td>,
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      let minPercentage = 100;
      let eventsInDay = events.filter(event => {
        if (isDateBetween(date.getTime(), event.startTime, event.endTime)) {
          minPercentage = Math.min(minPercentage, event.width);
          return true;
        } else {
          return false;
        }
      });

      let currentBoxHeight = boxHeight;
      if ((minPercentage * boxHeight) / 100 < minimumThinkness) {
        currentBoxHeight = (minimumThinkness * 100) / minPercentage;
      }

      //   maxEventCountInDay = Math.max(maxEventCountInDay, eventsInDay.length);
      // eventsInDay = eventsInDay.map(event => {
      //   return {
      //     ...event,
      //   };
      //   // return isDateBetween(date.getTime(), event.startTime, event.endTime);
      // });
      // const currentBoxHeight =
      //   minimumThinkness * events.leftOvercome < boxHeight
      //     ? boxHeight
      //     : minimumThinkness * eventsInDay.length;
      cells.push(
        <DayCellMonth
          key={i}
          isDraging={isDraging}
          currentBoxHeight={currentBoxHeight}
          eventsInDay={eventsInDay}
          dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
          dragingEventId={
            editingEventRef.current
              ? editingEventRef.current.sc_app__id
              : undefined
          }
          resizingEventId={
            editingEventRef.current && sideUseRef.current
              ? editingEventRef.current.sc_app__id
              : undefined
          }
          boxHeight={boxHeight}
          boxDay={date}
          day={i}
        />,
      );

      if (cells.length === 7) {
        rows.push(
          <tr className="ib__sc__table-td ib__sc__table-td-month" key={i}>
            {cells}
          </tr>,
        );
        cells = [];
      }
    }

    if (cells.length > 0) {
      for (let i = cells.length; i < 7; i++) {
        cells.push(<td key={`empty-${i}`} />);
      }

      rows.push(<tr key={daysInMonth}>{cells}</tr>);
    }

    return rows;
  };
  const onmonthChange = value => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + value);
    setSelectedDate(newDate);
  };

  return (
    <div>
      <EventHandlerContex.Provider
        value={{
          dragStart,
          resizeStart: resizeStart,
          updateEvent: updateEvent,

          dragEnd: dropHandler,
          resizeEnd: dropHandler,
        }}
      >
        <div className="ib__sc__table ib__sc__table-month-wrap">
          <div className="ib__sc__month-header">
            <div className="ib__sc__month-date">
              <div className="ib__sc__month-date-btn-group">
                <button
                  className="ib__sc__month-date__bt-prev"
                  onClick={() => onmonthChange(-1)}
                >
                  <LeftIcon />
                </button>

                <span className="ib__sc__month-date__bt-text">
                  {monthsOfYear[month]} {year}
                </span>

                <button
                  className="ib__sc__month-date__bt-next"
                  onClick={() => onmonthChange(1)}
                >
                  <RightIcon />
                </button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex' }}></div>
          <div className="calendar">
            <h2>
              {monthsOfYear[month]} {year}
            </h2>
            <table
              className="ib__sc__table-month"
              border="0"
              cellSpacing="0"
              cellPadding="0"
            >
              <thead>{renderDaysOfWeek()}</thead>
              <tbody>{renderCalendarDays()}</tbody>
            </table>
          </div>
        </div>
      </EventHandlerContex.Provider>
    </div>
  );
}

export default CalanderMonth;
