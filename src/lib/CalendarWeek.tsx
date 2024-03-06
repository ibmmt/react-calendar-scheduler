import React, { useEffect, useRef, useState } from 'react';
import CalenderSwitch from './CalenderSwitch';
import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import DayColumnWeek from './DayColumnWeek';
import { LeftIcon, RightIcon } from './Images';
import {
  addDays,
  calculatePositions,
  formatDate,
  getDaysDifference,
  getPreviousDay,
  isDateBetween,
  timeFormateFromHour,
} from './_utils';
import { EventObject } from './type/EventObject';

const boxHeightInit = 25;
const boxTime = 1; //1 hr

interface Props {
  eventsData: EventObject[];
  updateEvent: (event: EventObject) => void;
  selectedDate: Date | undefined;
  calenderType: string;
  weekHourBoxHeight?: number;
  startingWeekday: number;
  weekCalenderDayStartFromHour: number;
  weekCalenderVisibleHour: number;
  weekCalenderTitleFormate?: string;
  isShowAddNewEventButton?: boolean;
  weekCalenderTimeFormate: number;
  noOfDayColumn: number;
  calenderHeight: number;
  weekCalenderNextBtnDayIncrement: number;
  handleNextClick?: (date: Date, calenderType: string) => void;
  handlePrevClick?: (date: Date, calenderType: string) => void;
  handleChangeCurrentDate?: (date: Date, calenderType: string) => void;
  calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
  handleIncreaseTimeSpan: (value: number) => void;
  handleClanderTypeChange: (calenderType: string) => void;
  minimumEventThickness: number;
}

const CalendarWeek: React.FC<Props> = ({
  eventsData,
  updateEvent,
  selectedDate,
  calenderType,
  weekHourBoxHeight = boxHeightInit,
  startingWeekday,
  weekCalenderDayStartFromHour,
  weekCalenderVisibleHour = 12,
  weekCalenderTitleFormate = 'ddd',
  weekCalenderTimeFormate = 24,
  noOfDayColumn,
  calenderHeight,
  isShowAddNewEventButton,
  weekCalenderNextBtnDayIncrement,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  handleChangeCurrentDate: _handleChangeCurrentDate,
  calenderToAddOrUpdateEvent,
  handleIncreaseTimeSpan: _handleIncreaseTimeSpan,
  handleClanderTypeChange,
}) => {
  const [events, setEvents] = useState<EventObject[]>(eventsData);
  const calenderTableRef = useRef<HTMLDivElement>(null);
  const lastCleintYRef = useRef<number>(0);
  const dragEventRef = useRef<EventObject | null>(null);
  const currentDragDate = useRef<Date | null>(null);
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
    } else {
      return initDay;
    }
  };

  const findAndSetEvent = (event: EventObject, events: EventObject[]) => {
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

  const [dateStartFrom, setDateStartFrom] = useState<Date>(initSelectedDate);

  useEffect(() => {
    if (!dateStartFrom || Object.keys(dateStartFrom).length === 0) return;
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

  const dragStart = (event: EventObject, selectedDate: Date) => {
    currentDragDate.current = selectedDate;
    dragEventRef.current = { ...event, left: '0', width: 100 };
    setIsDraging(true);
  };

  const dragBoxMouseEnterToCell = (date: Date) => {
    if (!currentDragDate.current) return;
    const daysDiff = getDaysDifference(date, currentDragDate.current);
    if (daysDiff != 0 && dragEventRef.current) {
      dragEventRef.current.startTime = dragEventRef.current.startTime
        ? dragEventRef.current.startTime
        : 0;
      dragEventRef.current.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
      dragEventRef.current.endTime = dragEventRef.current.endTime
        ? dragEventRef.current.endTime
        : 0;

      dragEventRef.current.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
      currentDragDate.current = date;
      findAndSetEvent({ ...dragEventRef.current }, events);
    }
  };

  const dragingMouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (!dragEventRef.current) return;
    if (lastCleintYRef.current === 0) {
      lastCleintYRef.current = e.clientY;
      return;
    }
    const diff = e.clientY - lastCleintYRef.current;
    dragEventRef.current.startTime = dragEventRef.current.startTime
      ? dragEventRef.current.startTime
      : 0;
    dragEventRef.current.endTime = dragEventRef.current.endTime
      ? dragEventRef.current.endTime
      : 0;
    if (diff > 10 || diff < -10) {
      dragEventRef.current.startTime += (diff / boxHeight) * boxTime * 3600000;
      dragEventRef.current.endTime += (diff / boxHeight) * boxTime * 3600000;
      findAndSetEvent({ ...dragEventRef.current }, events);
      lastCleintYRef.current = e.clientY;
    }
  };

  const dropHandler = (e: Event) => {
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

  const onWeekChange = (diff: number) => {
    const dayDiff =
      noOfDayColumn > weekCalenderNextBtnDayIncrement
        ? weekCalenderNextBtnDayIncrement
        : noOfDayColumn;

    const newDateString = addDays(dateStartFrom, dayDiff * diff);
    setDateStartFrom(newDateString);
    if (diff > 0) {
      typeof _handleNextClick === 'function' &&
        _handleNextClick(newDateString, calenderType);
    } else {
      typeof _handlePrevClick === 'function' &&
        _handlePrevClick(newDateString, calenderType);
    }
  };
  const heightOfWeekColumnToShow =
    (boxHeight / boxTime) * weekCalenderVisibleHour;

  if (!calenderHeight) {
    calenderHeight = heightOfWeekColumnToShow;
  }
  return (
    <div>
      <div
        className={
          'ib__sc__table ib__sc__table-week ib_sc_type_' + calenderType
        }
      >
        <div className="ib__sc__header_wrapper">
          <div className="ib__sc__header">
            <div className="ib__sc__header__date-switch">
              <div className="ib__sc__week-date">
                <div className="ib__sc__week-date-btn-group">
                  <button
                    className="ib__sc__week-date__bt-prev ib__sc__np__btn"
                    onClick={() => onWeekChange(-1)}
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
                      value={formatDate(dateStartFrom, 'yyyy-MM-dd')}
                    />
                  </div>

                  <button
                    className="ib__sc__week-date__bt-next ib__sc__np__btn"
                    onClick={() => onWeekChange(1)}
                  >
                    <RightIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className="ib__sc__header__center"></div>

            <div className="ib__sc__header__right">
              {isShowAddNewEventButton && (
                <div className="ib__sc__header__right__btn-group">
                  <button
                    className="ib__sc__btn"
                    onClick={() => {
                      if (calenderToAddOrUpdateEvent)
                        calenderToAddOrUpdateEvent({});
                    }}
                  >
                    Add Event
                  </button>
                </div>
              )}
              <CalenderSwitch
                calenderType={calenderType}
                handleClanderTypeChange={type => {
                  if (handleClanderTypeChange) handleClanderTypeChange(type);
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex' }}>
          <EventHandlerContex.Provider
            value={{
              dragStart,
              updateEvent: updateEvent,
              dragEnd: dropHandler,
              calenderToAddOrUpdateEvent: calenderToAddOrUpdateEvent,
            }}
          >
            <div
              className="ib__sc__table-out ib__sc__table-out-week"
              style={{
                maxHeight: calenderHeight,
                overflowY:
                  heightOfWeekColumn > calenderHeight ? 'scroll' : 'initial',
              }}
              ref={calenderTableRef}
            >
              <div className="ib__sc__tb-wrapper ib__sc__tb-wrapper-week">
                <div
                  className="ib__sc__tb_week_time"
                  style={{ minHeight: heightOfWeekColumn + 'px' }}
                >
                  <div className="ib__sc__table-th">
                    <div className="ib__sc__btn-group ib__sc__increment-timespan ib__sc__flex_center">
                      <button
                        className="ib__sc__btn"
                        onClick={() => _handleIncreaseTimeSpan(-1)}
                      >
                        -
                      </button>
                      <button
                        className="ib__sc__btn"
                        onClick={() => {
                          _handleIncreaseTimeSpan(1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ib__sc__cell ib__sc__cell-week">
                    {[...Array(24).keys()].map((hour, index) => (
                      <div
                        key={index}
                        style={{ height: boxHeight + 'px' }}
                        className=" ib__sc__week-time"
                        draggable={'true'}
                      >
                        {index !== 0 && (
                          <span className="ib__sc__time_title">
                            {timeFormateFromHour(hour, weekCalenderTimeFormate)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {[...Array(noOfDayColumn).keys()].map(dayIndex => {
                  const now = new Date(dateStartFrom);
                  const boxDay = new Date(
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
                        {formatDate(new Date(boxDay), weekCalenderTitleFormate)}
                      </div>
                      <DayColumnWeek
                        calenderTableRef={calenderTableRef}
                        boxHeight={boxHeight}
                        updateEvent={updateEvent}
                        // dragingEventId={
                        //   dragEventRef.current
                        //     ? dragEventRef.current.sc_app__id
                        //     : null
                        // }
                        dragingEventId={
                          dragEventRef.current
                            ? dragEventRef.current.sc_app__id
                            : ''
                        }
                        boxDay={new Date(boxDay)}
                        dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
                        calenderToAddOrUpdateEvent={calenderToAddOrUpdateEvent}
                        events={
                          events
                            ? events.filter(event => {
                                if (event.startTime && event.endTime) {
                                  return isDateBetween(
                                    new Date(boxDay),
                                    event.startTime,
                                    event.endTime,
                                  );
                                }
                              })
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
