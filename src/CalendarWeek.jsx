import { useEffect, useRef, useState } from 'react';
import CalanderSwitch from './CalanderSwitch';
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
  timeFormateFromHour,
} from './_utils';

let boxHeightInit = 25;
let boxTime = 1; //1 hr

const CalendarWeek = ({
  eventsData,
  updateEvent,
  selectedDate,
  calanderType,
  weekHourBoxHeight = boxHeightInit,
  startingWeekday, // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
  weekCalanderDayStartFromHour, //day start from hour,
  weekCalanderVisibleHour = 12, //day visible hour
  weekCalanderTitleFormate, //day column title formate
  weekCalanderTimeFormate = 24, //day column title formate
  noOfDayColumn,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  handleChangeCurrentDate: _handleChangeCurrentDate,
  calanderToAddOrUpdateEvent,
  handleClanderTypeChange,
}) => {
  const [events, setEvents] = useState(eventsData);
  const calanderTableRef = useRef();
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

    /**If calander type week calander start from */
    if (calanderType == 'week') {
      return getPreviousDay(startingWeekday, initDay);
    } else {
      return initDay;
    }
  };

  const findAndSetEvent = (event, events) => {
    const index = events.findIndex(e => e.sc_app__id === event.sc_app__id);
    // alert(index);
    if (index > -1) {
      events[index] = event;
      setEvents([...events]);
    }
  };

  // initial date to start from
  const [dateStartFrom, setDateStartFrom] = useState(initSelectedDate);

  /**
   * Height of week calander column to show
   */
  const heightOfWeekColumnToShow =
    (boxHeight / boxTime) * weekCalanderVisibleHour;
  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(eventsData), 'dd/MM/yyyy', 'HH:mm:ss'),
        false,
      ),
    );
  }, [eventsData]);

  useEffect(() => {
    setDateStartFrom(initSelectedDate());
  }, [calanderType]);

  /**  Update event if dateStartFrom change  */
  useEffect(() => {
    if (!dateStartFrom || Object.keys(dateStartFrom).length === 0) return;
    setDateStartFrom(dateStartFrom);
    _handleChangeCurrentDate(dateStartFrom, calanderType);
  }, [dateStartFrom]);

  /**  Initilize calander  */
  useEffect(() => {
    if (calanderTableRef.current) {
      calanderTableRef.current.scrollTop =
        (weekCalanderDayStartFromHour * boxHeight) / boxTime;
    }
  }, []);

  /**
   * Dragin event mouse move handler
   * @param {Event} event
   * @param {Number} selectedDate
   */
  const dragStart = (event, selectedDate) => {
    currentDragDate.current = selectedDate;
    dragEventRef.current = { ...event, left: 0, width: '100' };
    setIsDraging(true);
  };

  /**  Mouse enter to new column  while dragging, update dragging event
   * @param {Date} date
   * @param {Date} currentDragDate
   * @return {undefined}
   */
  const dragBoxMouseEnterToCell = date => {
    const daysDiff = getDaysDifference(date, currentDragDate.current);
    if (daysDiff != 0) {
      dragEventRef.current.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
      dragEventRef.current.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
      currentDragDate.current = date;
      findAndSetEvent({ ...dragEventRef.current }, events);

      //  updateEvent({ ...dragEventRef.current });
    }
  };

  /**  Update dragging event on mouse enter
   * @param {e} Event object
   * @return {undefined}
   */
  const dragingMouseMoveHandler = e => {
    e.preventDefault();
    if (!dragEventRef.current) return;
    if (lastCleintYRef.current === 0) {
      lastCleintYRef.current = e.clientY;
      return;
    }
    const diff = e.clientY - lastCleintYRef.current;

    if (diff > 10 || diff < -10) {
      dragEventRef.current.startTime =
        dragEventRef.current.startTime + (diff / boxHeight) * boxTime * 3600000;
      dragEventRef.current.endTime =
        dragEventRef.current.endTime + (diff / boxHeight) * boxTime * 3600000;
      // updateEvent({ ...dragEventRef.current });
      findAndSetEvent({ ...dragEventRef.current }, events);
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
      updateEvent({ ...dragEventRef.current });
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

  /**
   * on week change
   * @param {number} diff
   */
  const onWeekChange = diff => {
    const newDateString = addDays(dateStartFrom, diff);
    setDateStartFrom(newDateString);
    if (diff > 0) {
      typeof _handleNextClick == 'function' &&
        _handleNextClick(newDateString, calanderType);
    } else {
      typeof _handlePrevClick == 'function' &&
        _handlePrevClick(newDateString, calanderType);
    }
  };

  return (
    <div>
      <div
        className={
          'ib__sc__table ib__sc__table-week ib_sc_type_' + calanderType
        }
      >
        <div className="ib__sc__header_wrapper">
          <div className="ib__sc__header">
            <div className="ib__sc__header__left">
              <CalanderSwitch
                calanderType={calanderType}
                handleClanderTypeChange={handleClanderTypeChange}
              />
            </div>
            <div className="ib__sc__header__date-switch">
              <div className="ib__sc__week-date">
                <div className="ib__sc__week-date-btn-group">
                  <button
                    className="ib__sc__week-date__bt-prev ib__sc__np__btn"
                    onClick={() => onWeekChange(-noOfDayColumn)}
                  >
                    <LeftIcon />
                  </button>

                  <div className="ib__sc__week-date__bt-text">
                    <input
                      type="date"
                      className="ib__sc-form-control"
                      onChange={e => {
                        setDateStartFrom(new Date(e.target.value));
                      }}
                      value={formatDate(new Date(dateStartFrom), 'yyyy-MM-dd')}
                    />
                  </div>

                  <button
                    className="ib__sc__week-date__bt-next ib__sc__np__btn"
                    onClick={() => onWeekChange(noOfDayColumn)}
                  >
                    <RightIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="ib__sc__header__right">
              <div className="ib__sc__header__right__btn-group">
                <button
                  className="ib__sc__btn"
                  onClick={calanderToAddOrUpdateEvent}
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex' }}>
          <EventHandlerContex.Provider
            value={{
              dragStart,
              updateEvent: updateEvent,
              dragEnd: dropHandler,
              calanderToAddOrUpdateEvent: calanderToAddOrUpdateEvent,
            }}
          >
            <div
              className="ib__sc__table-out ib__sc__table-out-week"
              style={{ height: heightOfWeekColumnToShow + 'px' }}
              ref={calanderTableRef}
            >
              <div className="ib__sc__tb-wrapper ib__sc__tb-wrapper-week">
                <div className="ib__sc__tb_week_time">
                  <div className="ib__sc__table-th">-</div>
                  <div className="ib__sc__cell ib__sc__cell-week">
                    {[...Array(24).keys()].map((hour, index) => (
                      <div
                        key={index}
                        style={{ height: boxHeight + 'px', draggable: 'true' }}
                        className=" ib__sc__week-time"
                      >
                        {index !== 0 && (
                          <span className="ib__sc__time_title">
                            {timeFormateFromHour(hour, weekCalanderTimeFormate)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {[...Array(noOfDayColumn).keys()].map(dayIndex => {
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
                      <div
                        key={dayIndex}
                        className="ib__sc__table-th ib__sc__truncate"
                      >
                        {formatDate(new Date(boxDay), weekCalanderTitleFormate)}
                      </div>
                      {/* Day column */}
                      <DayColumnWeek
                        dayIndex={dayIndex}
                        day={boxDay}
                        calanderTableRef={calanderTableRef}
                        boxHeight={boxHeight}
                        updateEvent={updateEvent}
                        dragingEventId={
                          dragEventRef.current
                            ? dragEventRef.current.sc_app__id
                            : null
                        }
                        boxTime={boxTime}
                        boxDay={new Date(boxDay)}
                        dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
                        calanderToAddOrUpdateEvent={calanderToAddOrUpdateEvent}
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
            </div>
          </EventHandlerContex.Provider>
        </div>
      </div>
    </div>
  );
};

export default CalendarWeek;
