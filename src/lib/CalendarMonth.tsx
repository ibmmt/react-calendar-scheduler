import React, { useEffect, useRef, useState } from 'react';
import CalenderSwitch from './CalendarSwitch';
import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import DayCellMonth from './DayCellMonth';
import { LeftIcon, RightIcon } from './Images';
import {
  calculatePositions,
  getDaysDifference,
  isDateBetween,
  weekdaysArr
} from './_utils';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';

interface CalenderMonthProps {
  currentDay: Date;
  eventsData: EventObject[];
  updateEvent: (event: EventObject) => void;
  calendarType: CalenderType;
  startingWeekday: number;
  monthViewDayHeight: number;
  selectedDate: Date;
  dayStartFrom: number;
  eventHeight: number;
  calendarHeight: number;
  showAddNewEventButton?: boolean;
  calendarHeader?: React.ReactNode;
  calendarToAddOrUpdateEvent: (eventObj:EventObject) => void;
  monthViewMinCellHeight: number;
  onNextClick?: (date: Date, calendarType: string) => void;
  onPrevClick?: (date: Date, calendarType: string) => void;
  onDateChange?: (date: Date, calendarType: CalenderType) => void;
  calendarViewOptions?: CalenderType[];
  monthViewDayTitleFormat?: string | ((day:string) => React.ReactNode);
 
  onCalendarTypeChange: (calendarType: CalenderType) => void;
}

function  CalenderMonth({
  currentDay=new Date(),
  eventsData,
  updateEvent,
  calendarType,
  startingWeekday,
  showAddNewEventButton = true,
  //week format
  monthViewDayTitleFormat="long",
  calendarHeight,
  eventHeight=30,
  calendarHeader,
  calendarToAddOrUpdateEvent,
  monthViewMinCellHeight: boxHeight = 60,
  onNextClick: _onNextClick,
  onPrevClick: _onPrevClick,
  onDateChange: _onDateChange,
  calendarViewOptions,
  //fromDate = new Date(),
  onCalendarTypeChange,
}: CalenderMonthProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(currentDay);
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const yearMonth = `${year}-${(month + 1).toString().padStart(2, '0')}`;
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [events, setEvents] = useState<EventObject[]>( calculatePositions(eventsData, 'month'));
  const currentDragDate = useRef<number>();
  const editingEventRef = useRef<any>();
  const [isDraging, setIsDraging] = useState(false);
  const sideUseRef = useRef('');

  if (!boxHeight) {
    if (calendarHeight) {
      boxHeight = calendarHeight / 5; // 5 weeks in a month
    } else {
      boxHeight = 50;
    }
  }

  /**
   * set current day
   */
  React.useEffect(() => {
    if (!currentDay) return;
    setSelectedDate(currentDay);
  }, [currentDay]);

  /**
   * set event id for events
   */
  useEffect(() => {
    setEvents(
      calculatePositions(
        //convertToComponentEventFormat(setEventID(eventsData), 'dd/MM/yyyy'),
        eventsData,
        'month',
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
  const dragStart = (event:EventObject, selectedDate: number) => {
   if(event.isDragable === false) return;
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
  const resizeStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: number, side: string) => {
    currentDragDate.current = date;
    editingEventRef.current = { ...event, left: 0, width: '100' };
    sideUseRef.current = side;
    setIsDraging(true);
  };

  /** Update dragging event on mouse enter
   * @param {e} Event object
   * @return {undefined}
   * */
  const dropHandler = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    sideUseRef.current = '';
    if (editingEventRef.current) {
      updateEvent({ ...editingEventRef.current });

      editingEventRef.current = null;
    }
    setIsDraging(false);
    // document.removeEventListener('mousemove', dragingMouseMoveHandler);
  };

  const findAndSetEvent = (event: EventObject, events: EventObject[]) => {
    const index = events.findIndex((e) => e.sc_app__id === event.sc_app__id);
    // alert(index);
    if (index > -1) {
      events[index] = event;
      setEvents([...events]);
    }
  };

  const dragBoxMouseEnterToCell = (date: Date) => {
    if (!editingEventRef.current) return;
    if(!currentDragDate.current) return;
 
    const newEvent = editingEventRef.current;
 
    const daysDiff = getDaysDifference(date, new Date(currentDragDate.current));

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
    findAndSetEvent(newEvent, events);
  };

  const renderDaysOfWeek = () => {
    return (
      <tr>
        {weekdaysArr.map((dayStr, index) => {
          return (
            <th className="ib__sc__table-th" key={dayStr}>
              {/* {weekdaysArr[(index + startingWeekday) % 7]} */}
            
                {typeof monthViewDayTitleFormat === 'function'
                  ? monthViewDayTitleFormat(weekdaysArr[(index + startingWeekday) % 7])
                  : (monthViewDayTitleFormat === 'long' ? weekdaysArr[(index + startingWeekday) % 7] : weekdaysArr[(index + startingWeekday) % 7].slice(0, 3))}
        
            </th>
          );
        })}
      </tr>
    );
  };

  /**
   * Render calendar days
   */

  const renderCalendarDays = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const rows = [];
    let cells = [];

    for (
      let i = 0;
      i < Math.abs(firstDayOfMonth + 7 - startingWeekday) % 7;
      i++
    ) {
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

      let maxiOverlap = 0;
      const eventsInDay = events.filter((event) => {
       
    
        if ( event.startTime&& event.endTime&& event.width&& isDateBetween(date, event.startTime, event.endTime)) {
      
          maxiOverlap = Math.max(maxiOverlap, event.noOfOverLeftLap || 0);
           
          return true;
        } else {
          return false;
        }
      });

      const  currentBoxHeight = Math.max(boxHeight, eventHeight * (maxiOverlap + 1));

 

      cells.push(
        <DayCellMonth
          key={i}
         // isDraging={isDraging}
          currentBoxHeight={currentBoxHeight}
          eventsInDay={eventsInDay}
          eventHeight={eventHeight}
          dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
          calendarToAddOrUpdateEvent={calendarToAddOrUpdateEvent}
          isCurrentDay={today === date.getTime()}
          dragingEventId={
            editingEventRef.current
              ? editingEventRef.current?.sc_app__id
              : undefined
          }
          resizingEventId={
            editingEventRef.current && sideUseRef.current
              ? editingEventRef.current.sc_app__id
              : undefined
          }
          boxHeight={boxHeight}
          boxDay={new Date(date).getTime()}
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
  const onmonthChangeNextPrev = (value: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + value);
    setSelectedDate(newDate);
    if (value > 0) {
      typeof _onNextClick === 'function' &&
        _onNextClick(newDate, calendarType);
    } else {
      typeof _onPrevClick === 'function' &&
        _onPrevClick(newDate, calendarType);
    }
    typeof _onDateChange === 'function' &&
      _onDateChange(newDate, calendarType);
  
  };

  /**
   * Select month
   * @param {} e
   */

  const selectMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
     if (!newDate || isNaN(newDate.getTime())) {
      return;
    }
    setSelectedDate(newDate);
    typeof _onDateChange === 'function' &&
      _onDateChange(newDate, calendarType);
  };



  return (
    <div>
      <EventHandlerContex.Provider
        value={{
          dragStart,
          resizeStart: resizeStart,
          updateEvent: updateEvent,
          calendarToAddOrUpdateEvent,
          dragEnd: dropHandler,
          resizeEnd: dropHandler,
        }}
      >
        <div
          className={
            'ib__sc__table ib__sc__table-month-wrap ib_sc_type_' + calendarType
          }
        >
          <div className="ib__sc__header_wrapper">
            <div className="ib__sc__header">
              <div className="ib__sc__header__date-switch">
                <div className="ib__sc__month-date">
                  <div className="ib__sc__month-date-btn-group">
                    <button
                      className="ib__sc__month-date__bt-prev ib__sc__np__btn"
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
                      className="ib__sc__month-date__bt-next ib__sc__np__btn"
                      onClick={() => onmonthChangeNextPrev(1)}
                    >
                      <RightIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="ib__sc__header__center">
                {calendarHeader}
              </div>

              <div className="ib__sc__header__right">
               
               {showAddNewEventButton && <div className="ib__sc__header__right__btn-group">
                  <button
                    className="ib__sc__btn"
                    onClick={()=>{calendarToAddOrUpdateEvent({
                      isDragable: false,
                      isResizable: false,
                      startTime: new Date().setHours(0, 0, 0, 0),
                      endTime: new Date().setHours(1, 0, 0, 0),
                    })}}
                  >
                    Add Event
                  </button>
               
                </div>
                }

                <CalenderSwitch
                  calendarType={calendarType}
                  calendarViewOptions={calendarViewOptions}
                  onCalendarTypeChange={onCalendarTypeChange}
                />
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex' }}></div>
          <div className="calendar">
            <table
              className="ib__sc__table-month"
              border={0}
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

export default CalenderMonth;
