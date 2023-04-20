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
  weekdaysArr,
} from './_utils';

//const boxHeight = 60;
function CalanderMonth({
  currentDay,
  eventsData,
  updateEvent,
  calanderType,
  minimumEventThickness,
  calanderToAddOrUpdateEvent,
  monthCalanderMinCellHeight: boxHeight = 60,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  handleChangeCurrentDate: _handleChangeCurrentDate,
  fromDate = new Date(),
}) {
  const [selectedDate, setSelectedDate] = useState(fromDate);
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const yearMonth = `${year}-${(month + 1).toString().padStart(2, '0')}`;
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [events, setEvents] = useState(eventsData);
  const currentDragDate = useRef();
  const editingEventRef = useRef();
  const [isDraging, setIsDraging] = useState(false);
  const sideUseRef = useRef('');

  /**
   * set current day
   */
  useEffect(() => {
    if (!currentDay) return;
    setSelectedDate(currentDay);
  }, [currentDay]);

  /**
   * set event id for events
   */
  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(eventsData), 'dd/MM/yyyy', 'HH:mm:ss'),
        true,
      ),
    );
  }, [eventsData]);

  /**
   *   remove text selection while mouse  dragining
   */
  useEffect(() => {
    if (!isDraging) return;
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
    currentDragDate.current = selectedDate;
    editingEventRef.current = { ...event, left: 0, width: '100' };
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
    editingEventRef.current = { ...event, left: 0, width: '100' };
    sideUseRef.current = side;
    setIsDraging(true);
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

    if (daysDiff === 0) return;

    if (sideUseRef.current === 'left') {
      newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
    } else if (sideUseRef.current === 'right') {
      newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
    } else {
      newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
      newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
    }
    editingEventRef.current = newEvent;
    currentDragDate.current = date.getTime();

    for (let i = 0; i < events.length; i++) {
      if (events[i].sc_app__id === newEvent.sc_app__id) {
        events[i] = newEvent;
        break;
      }
    }
    setEvents([...events]);
  };
  const renderDaysOfWeek = () => {
    return (
      <tr>
        {weekdaysArr.map(day => (
          <th className="ib__sc__table-th" key={day}>
            {day}
          </th>
        ))}
      </tr>
    );
  };

  /**
   * Render calendar days
   */

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
      if ((minPercentage * boxHeight) / 100 < minimumEventThickness) {
        currentBoxHeight = (minimumEventThickness * 100) / minPercentage;
      }

      cells.push(
        <DayCellMonth
          key={i}
          isDraging={isDraging}
          currentBoxHeight={currentBoxHeight}
          eventsInDay={eventsInDay}
          dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
          calanderToAddOrUpdateEvent={calanderToAddOrUpdateEvent}
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

  /**
   * Next and prev month
   * @param {number} value
   */
  const onmonthChangeNextPrev = value => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + value);
    setSelectedDate(newDate);
    if (value > 0) {
      _handleNextClick(newDate, calanderType);
    } else {
      _handlePrevClick(newDate, calanderType);
    }
  };

  /**
   * Select month
   * @param {} e
   */

  const selectMonth = e => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    _handleChangeCurrentDate(newDate, calanderType);
  };

  return (
    <div>
      <EventHandlerContex.Provider
        value={{
          dragStart,
          resizeStart: resizeStart,
          updateEvent: updateEvent,
          calanderToAddOrUpdateEvent,
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
                  onClick={() => onmonthChangeNextPrev(-1)}
                >
                  <LeftIcon />
                </button>

                <span className="ib__sc__month-date__bt-text">
                  <input
                    type="month"
                    className="ib__sc-form-control"
                    placeholder="yyyy-mm"
                    onChange={selectMonth}
                    value={yearMonth}
                  />
                </span>

                <button
                  className="ib__sc__month-date__bt-next"
                  onClick={() => onmonthChangeNextPrev(1)}
                >
                  <RightIcon />
                </button>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex' }}></div>
          <div className="calendar">
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
