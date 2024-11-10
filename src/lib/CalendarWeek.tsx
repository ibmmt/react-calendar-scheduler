import React, { useEffect, useRef, useState } from 'react';
import CalenderSwitch from './CalendarSwitch';
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
  timeFormateFromHour
} from './_utils';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';

const boxHeightInit = 25;
const boxTime = 1; //1 hr
let today = new Date().setHours(0, 0, 0, 0);
 

interface Props {
  eventsData: EventObject[];
  updateEvent: (event: EventObject) => void;
  selectedDate: Date | undefined;
  calendarType: CalenderType;
  weekHourCellHeight?: number;
  startingWeekday: number;
  weekViewStartHour: number;
  weekViewVisibleHours: number;
  weekViewDayTitleFormat?: string | ((date: Date) => React.ReactNode);


  showAddNewEventButton?: boolean;
  weekViewTimeFormat: number;
  noOfDayColumn: number;
  calendarHeight:number,
  weekViewNextButtonDayIncrement: number;
  onNextClick?: (date: Date, calendarType: string) => void;
  onPrevClick?: (date: Date, calendarType: string) => void;
  onDateChange?:(date: Date, calendarType: CalenderType) => void;
  calendarToAddOrUpdateEvent: (eventObj:EventObject) => void;
  onIncreaseTimeSpan: (value: number) => void;
  onCalendarTypeChange: (calendarType: CalenderType) => void;
  eventHeight: number;
  calendarHeader: React.ReactNode;
  calendarViewOptions?: CalenderType[];
  eventWidth: number;
}


const CalendarWeek: React.FC<Props> = ({
  eventsData,
  updateEvent,
  selectedDate,
  calendarHeader,
  calendarType,
  weekHourCellHeight = boxHeightInit,
  startingWeekday,
  weekViewStartHour,
  weekViewVisibleHours = 12,
  weekViewDayTitleFormat= 'ddd',
  weekViewTimeFormat = 24,
  noOfDayColumn,
  calendarHeight,
  showAddNewEventButton,
  weekViewNextButtonDayIncrement,
  onNextClick: _onNextClick,
  onPrevClick: _onPrevClick,
  onDateChange: _onDateChange,
  calendarToAddOrUpdateEvent,
  eventWidth = 100,
  onIncreaseTimeSpan: _onIncreaseTimeSpan,
  onCalendarTypeChange,
  calendarViewOptions
 
}) => {
  const [events, setEvents] = useState<EventObject[]>(eventsData);
  const calendarTableRef = useRef<HTMLDivElement>(null);
  const lastCleintYRef = useRef<number>(0);
  const dragEventRef = useRef<EventObject | null>(null);
  const currentDragDate = useRef<Date | null>(null);
  const boxHeight = weekHourCellHeight;
  const heightOfWeekColumn = boxHeight * boxTime * 24;
  const headColumnTime = useRef(null);
  const headColumn = useRef <HTMLDivElement | null>(null);
  const [headHeight, setHeadHeight] = useState(0);
  // const [headColumnWidth, setHeadColumnWidth] = useState(0);
  
 

  const [isDraging, setIsDraging] = useState(false);

  const initSelectedDate = () => {
    let initDay = new Date();


    if (selectedDate && typeof selectedDate === 'object') {
      initDay = selectedDate;
    }

  

    if (calendarType === 'week') {
      return getPreviousDay(startingWeekday, initDay);
    } else {
      return initDay;
    }
  };

  const findAndSetEvent = (event: EventObject, events: EventObject[]) =>

 {
    const index = events.findIndex(e => e.sc_app__id === event.sc_app__id);
    if (index > -1) {
      events[index] = event;
      setEvents([...events]);
    }
  };

  useEffect(() => {
   
    setEvents(
      calculatePositions(
       eventsData, 
       'week',
      ),
    );
  }, [eventsData]);
  

  useEffect(() => {
    setDateStartFrom(initSelectedDate());
  }, [calendarType]);

  const [dateStartFrom, setDateStartFrom] = useState<Date>(initSelectedDate);

  useEffect(() => {
    if (!dateStartFrom || Object.keys(dateStartFrom).length === 0) return;
    setDateStartFrom(dateStartFrom);
    if(_onDateChange)
    _onDateChange(dateStartFrom, calendarType);
  }, [dateStartFrom]);

  useEffect(() => {
    if (calendarTableRef.current) {
      calendarTableRef.current.scrollTop =
        (weekViewStartHour * boxHeight) / boxTime;
    }
  }, [weekHourCellHeight]);

  const dragStart = (event: EventObject, selectedDate: Date) => {
 

    currentDragDate.current = selectedDate;
    dragEventRef.current = { ...event, left: 0, width: 100 };
    setIsDraging(true);
  };
  

  const dragBoxMouseEnterToCell = (date: Date) => {
    if(!currentDragDate.current) return;
    const daysDiff = getDaysDifference(date, currentDragDate.current);
    if (daysDiff != 0 && dragEventRef.current) {
      dragEventRef.current.startTime=dragEventRef.current.startTime ? dragEventRef.current.startTime:0
      dragEventRef.current.startTime +=
        daysDiff * 24 * HOUR_MILLISECONDS;
      dragEventRef.current.endTime=dragEventRef.current.endTime ? dragEventRef.current.endTime:0

      dragEventRef.current.endTime +=
        daysDiff * 24 * HOUR_MILLISECONDS;
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
    dragEventRef.current.startTime=dragEventRef.current.startTime ? dragEventRef.current.startTime:0
    dragEventRef.current.endTime=dragEventRef.current.endTime ? dragEventRef.current.endTime:0
    if (diff > 10 || diff < -10) {
      dragEventRef.current.startTime +=
        (diff / boxHeight) * boxTime * 3600000;
      dragEventRef.current.endTime +=
        (diff / boxHeight) * boxTime * 3600000;
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

  useEffect(() => {
    today = new Date().setHours(0, 0, 0, 0);
    // Get the height of the first div and set it to the state
    if (headColumn.current) {
     // console.log("headColumn.current.offsetWidth---------------------->>",headColumn.current.offsetWidth);
      //setHeadColumnWidth(headColumn.current.offsetWidth);
      //setClass1Height(class1Ref.current.offsetHeight);
      setHeadHeight(headColumn?.current?.offsetHeight);

    }
  }, []);

  const onWeekChange = (diff: number) => {
    const dayDiff =
      noOfDayColumn > weekViewNextButtonDayIncrement
       

 ? weekViewNextButtonDayIncrement
        : noOfDayColumn;

    const newDateString = addDays(dateStartFrom, dayDiff * diff);
    setDateStartFrom(newDateString);
    if (diff > 0) {
      typeof _onNextClick === 'function' &&
        _onNextClick(newDateString, calendarType);
    } else {
      typeof _onPrevClick === 'function' &&
        _onPrevClick(newDateString, calendarType);
    }
  };
  const heightOfWeekColumnToShow =
  (boxHeight / boxTime) * weekViewVisibleHours;

  if (!calendarHeight) {
    calendarHeight = heightOfWeekColumnToShow;
  }
  return (
    <div>
      <div
        className={
          'ib__sc__table ib__sc__table-week ib_sc_type_' + calendarType
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
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        if (selectedDate&& !isNaN(selectedDate.getTime())){
                          setDateStartFrom(new Date(e.target.value));

                        }
                        
                       
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
            <div className="ib__sc__header__center">
              {calendarHeader}
            </div>

            <div className="ib__sc__header__right">
              
             {showAddNewEventButton&& <div className="ib__sc__header__right__btn-group">
                <button
                  className="ib__sc__btn"
                  onClick={()=>{if(calendarToAddOrUpdateEvent)calendarToAddOrUpdateEvent({
                    isDragable: false,
                    isResizable: false,
                    startTime: new Date().setHours(0, 0, 0, 0),
                    endTime: new Date().setHours(1, 0, 0, 0),
                  })}}
                >
                  Add Event
                </button>
              </div>}
              <CalenderSwitch
                calendarType={calendarType}
                calendarViewOptions={calendarViewOptions}
                onCalendarTypeChange={(type)=>{ if(onCalendarTypeChange) onCalendarTypeChange(type)}}
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
              calendarToAddOrUpdateEvent: calendarToAddOrUpdateEvent,
            }}
          >
            <div
              className="ib__sc__table-out ib__sc__table-out-week"
              style={{
                maxHeight: calendarHeight,
                overflowY:
                  heightOfWeekColumn > calendarHeight ? 'scroll' : 'initial',
              }}
              ref={calendarTableRef}
            >
              <div className="ib__sc__tb-wrapper ib__sc__tb-wrapper-week">
                <div className="ib__sc__tb_week_time"
                 style={{ minHeight: heightOfWeekColumn + 'px' }}
                
                >
                  <div className="ib__sc__table-th ib__sc__table-th-week "
                  ref={headColumnTime}
                  style={{ height: headHeight + 'px', maxHeight: headHeight + 'px' }}
                  >
                    <div className="ib__sc__btn-group ib__sc__increment-timespan ib__sc__flex_center">
                      <button
                        className="ib__sc__btn"
                        onClick={() => _onIncreaseTimeSpan(-1)}
                      >
                        -
                      </button>
                      <button
                        className="ib__sc__btn"
                        onClick={() => {
                          _onIncreaseTimeSpan(1);
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
                        draggable={"true"}
                      >
                        {index !== 0 && (
                          <span className="ib__sc__time_title">
                            {timeFormateFromHour(hour, weekViewTimeFormat)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {[...Array(noOfDayColumn).keys()].map((dayIndex) => {
                  const now = new Date(dateStartFrom);
                  const boxDay = new Date(
                    now.setDate(now.getDate() + dayIndex)
                  ).setHours(0, 0, 0, 0);
                   
                  let maxiOverlap = 0

                  const eventsOnDay =  events
                  ? events.filter((event) =>{
                  
                      if( event.startTime && event.endTime){
                        const isSameDay= isDateBetween(
                        new Date(boxDay),
                      event.startTime,
                        event.endTime
                      )
                      
                      if(isSameDay){
                       // minWdithPercentage =Math.min(event.width || 100 ,100)

                      maxiOverlap = Math.max(maxiOverlap, event.noOfOverLeftLap || 0);
                      }

                      return isSameDay
                  }}
                    )
                  : []

                  const  minWidthOfCloumn = Math.max(0, eventWidth * (maxiOverlap + 1));
                  
                  
                
                  return (
                    <div
                      key={dayIndex}
                      // add class 'ib__sc__current-day' if it is today
                      className={"ib__sc__table-td ib__sc__table-td-week "+(today==boxDay? 'ib__sc__today today':'') }
                      style={{ minHeight: heightOfWeekColumn + 'px' , minWidth: minWidthOfCloumn + 'px'}}
                    >
                      <div
                        key={dayIndex}
                        className="ib__sc__table-th ib__sc__truncate "
                        ref={headColumn}
                      >
                       {
                        typeof weekViewDayTitleFormat === 'function' 
                          ? weekViewDayTitleFormat(new Date(boxDay)) 
                          : formatDate(new Date(boxDay), weekViewDayTitleFormat)
                      }
                       
                      </div>
                      <DayColumnWeek
                        calendarTableRef={calendarTableRef}
                        boxHeight={boxHeight}
                        updateEvent={updateEvent}
                        eventWidth={eventWidth}
                        minWidthOfCloumn={minWidthOfCloumn}
                        // dragingEventId={
                        //   dragEventRef.current
                        //     ? dragEventRef.current.sc_app__id
                        //     : null
                        // }
                        dragingEventId={
                          dragEventRef.current
                            ? dragEventRef.current.sc_app__id
                            : ""
                        }
                       
                        boxDay={new Date(boxDay)}
                        dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
                        calendarToAddOrUpdateEvent={calendarToAddOrUpdateEvent}
                        events={eventsOnDay }
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