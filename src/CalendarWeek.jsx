import { useEffect, useRef, useState } from 'react';
import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import DayColumnWeek from './DayColumnWeek';
import { LeftIcon, RightIcon } from './_svg_icon';
import {
  addDays,
  calculatePositions,
  formatDate,
  getDaysDifference,
  getPreviousDay,
  isDateBetween,
  parseEvents,
  setEventID,
} from './_utils';
//Create context for event handler

let boxHeightInit = 25;
let boxTime = 1; //1 hr

const CalendarWeek = props => {
  const [events, setEvents] = useState(props.events);
  const calanderTableRef = useRef();
  const calanderTBRef = useRef();
  const lastCleintYRef = useRef(0);
  //const [draggingEvent, setDraggingEvent] = useState(null);
  const dragEventRef = useRef(null);
  const currentDragDate = useRef(null);
  const boxHeight = props.hourBoxHeight ? props.hourBoxHeight : boxHeightInit;
  const dayStartingFrom = props.dayStartingFrom ? props.dayStartingFrom : 7;
  const heightOfWeekColumn = boxHeight * boxTime * 24;
  //const NoOfDayColumn = props.NoOfDayColumn ? props.NoOfDayColumn : 7;
  const [isDraging, setIsDraging] = useState(false);

  // initial date to start from
  const [dateStartFrom, setDateStartFrom] = useState(() => {
    if (props.calanderType == 'week') {
      return getPreviousDay(props.dayStartFrom);
    } else if (props.dateStartFrom && Object.keys(props.dateStartFrom).length) {
      return props.dayStartFrom;
    } else {
      return new Date();
    }
  });

  const heightOfWeekColumnToShow =
    (boxHeight / boxTime) *
    (props.noOFHoursToShow ? props.noOFHoursToShow : 12);
  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(props.events), 'dd/MM/yyyy', 'HH:mm:ss'),
      ),
    );
  }, [props.events]);

  useEffect(() => {
    if (!props.dateStartFrom || Object.keys(props.dateStartFrom).length === 0)
      return;
    setDateStartFrom(props.dateStartFrom);
  }, [props.dateStartFrom]);

  // useEffect(() => {
  //   if (!props.dateStartFrom) return;
  //   setDateStartFrom(props.dateStartFrom);
  //   //setDateStartFrom(new Date());
  // }, [props.dayStartFrom]);

  useEffect(() => {
    if (calanderTableRef.current) {
      calanderTableRef.current.scrollTop =
        (dayStartingFrom * boxHeight) / boxTime;
    }
  }, []);

  const dragStart = (event, selectedDate) => {
    console.debug('dragStart');
    currentDragDate.current = selectedDate;
    dragEventRef.current = { ...event, left: 0, width: '100' };
    setIsDraging(true);
    //setDraggingEvent({ ...event, left: 0, width: '100%' });
  };

  /**  Mouse enter to new column  while dragging, update dragging event
   * @param {Date} date
   * @param {Date} currentDragDate
   * @return {undefined}
   */
  const dragBoxMouseEnter = date => {
    console.debug('dragBoxMouseEnter');

    const daysDiff = getDaysDifference(date, currentDragDate.current);
    if (daysDiff != 0) {
      dragEventRef.current.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
      dragEventRef.current.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
      currentDragDate.current = date;

      props.updateEvent(dragEventRef.current);
      //setDraggingEvent({ ...draggingEvent });
    }
  };

  /**  Update dragging event on mouse enter
   * @param {e} Event object
   * @return {undefined}
   */
  const dragingMouseMoveHandler = e => {
    console.debug('dragingMouseMoveHandler');
    e.preventDefault();
    if (!dragEventRef.current) return;
    if (lastCleintYRef.current === 0) {
      lastCleintYRef.current = e.clientY;
      return;
    }
    const diff = e.clientY - lastCleintYRef.current;
    console.debug('diff', diff);
    if (diff > 10 || diff < -10) {
      dragEventRef.current.startTime =
        dragEventRef.current.startTime + (diff / boxHeight) * boxTime * 3600000;
      dragEventRef.current.endTime =
        dragEventRef.current.endTime + (diff / boxHeight) * boxTime * 3600000;
      props.updateEvent({ ...dragEventRef.current });
      //  setDraggingEvent({ ...dragEve, startTime, endTime });
      lastCleintYRef.current = e.clientY;
    }
  };

  /** Update dragging event on mouse enter
   * @param {e} Event object
   * @return {undefined}
   * */
  const dropHandler = e => {
    if (e) {
      e.preventDefault();
    }
    if (dragEventRef.current) {
      props.updateEvent(dragEventRef.current);
      lastCleintYRef.current = 0;
      dragEventRef.current = null;
    }
    setIsDraging(false);
    document.removeEventListener('mousemove', dragingMouseMoveHandler);
  };

  /**  Use effect to add mouse move and mouse up event listener
   * @param {e} Event object
   * @return {undefined}
   * */
  useEffect(() => {
    if (!dragEventRef.current || !isDraging) return;
    document.addEventListener('mousemove', dragingMouseMoveHandler);
    document.addEventListener('mouseup', dropHandler);
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.userSelect = 'auto';
      document.removeEventListener('mousemove', dragingMouseMoveHandler);
      document.removeEventListener('mouseup', dropHandler);
    };
  }, [isDraging]);

  const onWeekChange = diff => {
    setDateStartFrom(addDays(dateStartFrom, diff));
  };

  return (
    <div>
      <div className="ib__sc__table ib__sc__table-week">
        <div className="ib__sc__week-header">
          <div className="ib__sc__week-date">
            <div className="ib__sc__week-date-btn-group">
              <button
                className="ib__sc__week-date__bt-prev"
                onClick={() => onWeekChange(-props.NoOfDayColumn)}
              >
                <LeftIcon />
              </button>

              <span className="ib__sc__week-date__bt-text">
                {formatDate(new Date(dateStartFrom), 'dd/MMM/yyyy')}

                {props.calanderType == 'week' && (
                  <>
                    -
                    {formatDate(
                      addDays(dateStartFrom, props.NoOfDayColumn),
                      'dd/MMM/yyyy',
                    )}
                  </>
                )}
              </span>

              <button
                className="ib__sc__week-date__bt-next"
                onClick={() => onWeekChange(props.NoOfDayColumn)}
              >
                <RightIcon />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={calanderTBRef}
          style={{ position: 'relative', display: 'flex' }}
        >
          <EventHandlerContex.Provider
            value={{
              dragStart,
              updateEvent: props.updateEvent,
              dragEnd: dropHandler,
            }}
          >
            <div
              className="ib__sc__table-out ib__sc__table-out-week"
              style={{ height: heightOfWeekColumnToShow + 'px' }}
              ref={calanderTableRef}
            >
              <div className="ib__sc__tb-wrapper ib__sc__tb-wrapper-week">
                <div className="ib__sc__tb_week_time" style={{ width: '45px' }}>
                  <div className="ib__sc__table-th">-</div>
                  <div className="ib__sc__cell ib__sc__cell-week">
                    {[...Array(24).keys()].map((hour, index) => (
                      <div
                        key={index}
                        style={{ height: boxHeight + 'px', draggable: 'true' }}
                        className="ib__sc__table-hr-box-week ib__sc__week-time"
                      >
                        {index !== 0 && <small>{hour}:00</small>}
                      </div>
                    ))}
                  </div>
                </div>
                {[...Array(props.NoOfDayColumn).keys()].map(dayIndex => {
                  const now = new Date(dateStartFrom);
                  let boxDay = new Date(
                    now.setDate(now.getDate() + dayIndex),
                  ).setHours(0, 0, 0, 0);
                  return (
                    <div
                      key={dayIndex}
                      className="ib__sc__table-td ib__sc__table-td-week"
                      style={{ minHeight: heightOfWeekColumn + 'px' }}
                    >
                      <div key={dayIndex} className="ib__sc__table-th">
                        {formatDate(
                          new Date(boxDay),
                          props.dayColumnTitleFormate
                            ? props.dayColumnTitleFormate
                            : 'dd/MMM/yyyy',
                        )}
                      </div>
                      {/* Day column */}
                      <DayColumnWeek
                        dayIndex={dayIndex}
                        day={boxDay}
                        calanderTableRef={calanderTableRef}
                        boxHeight={boxHeight}
                        updateEvent={props.updateEvent}
                        dragingEventId={
                          dragEventRef.current
                            ? dragEventRef.current.sc_app__id
                            : null
                        }
                        boxTime={boxTime}
                        boxDay={new Date(boxDay)}
                        dragBoxMouseEnter={dragBoxMouseEnter}
                        calanderToAddOrUpdateEvent={
                          props.calanderToAddOrUpdateEvent
                        }
                        // heightOfWeekColumn={heightOfWeekColumn}
                        events={
                          events
                            ? events.filter(event =>
                                isDateBetween(
                                  boxDay,
                                  event.startTime,
                                  event.endTime,
                                ),
                              )
                            : []
                        }
                      />
                    </div>
                  );
                })}
              </div>
              {/* <DragingEvent
                draggingEvent={draggingEvent}
                boxTime={boxTime}
                boxHeight={boxHeight}
              /> */}
            </div>
          </EventHandlerContex.Provider>
        </div>
      </div>
    </div>
  );
};

export default CalendarWeek;
