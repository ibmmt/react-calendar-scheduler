import React, { useEffect, useRef, useState } from 'react';
import { calculatePositions, getDaysDifference } from './_utils';
import CalendarTeamListItems from './CalendarTeamListItems';
import CalenderSwitch from './CalenderSwitch';
import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import { LeftIcon, RightIcon } from './Images';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
import { Team } from './type/team';

interface CalendarTeamProps {
    currentDay?: Date;
  eventsData: EventObject[];
  teams: Team[];
  selectedDate: Date;
  calenderType:CalenderType;
  calendarSwitchOptions?: CalenderType[];
  handleChangeCurrentDate?: (date: Date, calenderType: CalenderType) => void;
  updateEvent: (event: EventObject) => void;
  handleCalendarTypeChange: (calenderType: CalenderType) => void;
  calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
  handleNextClick?: (date: Date, calenderType: CalenderType) => void;
  handlePrevClick?: (date: Date, calenderType: CalenderType) => void;

    minimumEventThickness?: number;
    calendarHeaderComponent?: React.ReactNode;
 
}

const weekdaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function CalendarTeam({
    currentDay=new Date(),
  eventsData,
  teams,
  selectedDate,
  calenderType,
  handleChangeCurrentDate,
  updateEvent,
  handleCalendarTypeChange,
  calenderToAddOrUpdateEvent,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  minimumEventThickness=30,
  calendarHeaderComponent,
  calendarSwitchOptions,

 // monthCalenderMinCellHeight: boxHeight = 60,
}: CalendarTeamProps) {
  const [selectedWeekStartDate, setSelectedWeekStartDate] = useState<Date>(selectedDate);
  const [events, setEvents] = useState<EventObject[]>( calculatePositions(eventsData, 'team'));




  const currentDragDate = useRef<number>();
  const editingEventRef = useRef<any>();
  const [isDraging, setIsDraging] = useState(false);
  const sideUseRef = useRef('');

  useEffect(() => {
    if (selectedDate) {
      setSelectedWeekStartDate(selectedDate);
    }
  }, [selectedDate]);

    useEffect(() => {
        setEvents(calculatePositions(eventsData, 'team'));
    }, [eventsData, calenderType]);



    React.useEffect(() => {
        if (!currentDay) return;
        //  selectedDate(currentDay);
      }, [currentDay]);
    
     
    
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
     

      // listen to mouse move clikup event
       
    
      /** Update dragging event on mouse enter
       * @param {e} Event object
       * @return {undefined}
       * */
      const dropHandler = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!editingEventRef.current) {
            return

        }
        if (e) {
          e.preventDefault();
        }
        sideUseRef.current = '';
       
          updateEvent({ ...editingEventRef.current });
          editingEventRef.current = null;
        
        setIsDraging(false);
        // document.removeEventListener('mousemove', dragingMouseMoveHandler);
      };

      useEffect(() => {
        if (!isDraging) return;
        document.addEventListener('mouseup', ()=>dropHandler());
        return () => {
        document.removeEventListener('mouseup', ()=>dropHandler());
        };
    }, [isDraging]);
    
      const findAndSetEvent = (event: EventObject, events: EventObject[]) => {
        const index = events.findIndex((e) => e.sc_app__id === event.sc_app__id);
        // alert(index);
        if (index > -1) {
          events[index] = event;
          setEvents([...events]);
        }
      };
    
      const dragBoxMouseEnterToCell = (date: Date,userId: string| number) => {
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
        newEvent.userId = userId;
         editingEventRef.current = newEvent;
        currentDragDate.current = date.getTime();
        findAndSetEvent(newEvent, events);
      };
    

  const onWeekChangeNextPrev = (value: number) => {
    const newDate = new Date(selectedWeekStartDate);
    newDate.setDate(newDate.getDate() + value * 7);
    setSelectedWeekStartDate(newDate);
    if (value > 0) {
      _handleNextClick && _handleNextClick(newDate, calenderType);
    } else {
      _handlePrevClick && _handlePrevClick(newDate, calenderType);
    }
  };

  const selectWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!newDate || isNaN(newDate.getTime())) {
      return;
    }
    setSelectedWeekStartDate(newDate);
    handleChangeCurrentDate && handleChangeCurrentDate(newDate, calenderType);
  };

  const renderWeekDaysHeader = () => {
    const days = [];
    const startOfWeek = new Date(selectedWeekStartDate);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(
        <th key={i} className="ib__sc__table-th">
          {weekdaysArr[day.getDay()]}<br />
          {day.toLocaleDateString()}
        </th>
      );
    }
    return (
      <tr>
        <th className="ib__sc__table-th">Team</th>
        {days}
      </tr>
    );
  };

  return (
    <EventHandlerContex.Provider
        value={{
          dragStart,
          resizeStart: resizeStart,
          updateEvent: updateEvent,
          calenderToAddOrUpdateEvent,
          dragEnd: dropHandler,
          resizeEnd: dropHandler,
        }}
      >
    <div className={'ib__sc__table ib__sc__table-team-wrap ib_sc_type_' + calenderType}>

     
      <div className="ib__sc__header_wrapper">
        <div className="ib__sc__header">
          <div className="ib__sc__header__date-switch">
            <div className="ib__sc__month-date">
              <div className="ib__sc__month-date-btn-group">
                <button
                  className="ib__sc__month-date__bt-prev ib__sc__np__btn"
                  onClick={() => onWeekChangeNextPrev(-1)}
                >
                  <LeftIcon />
                </button>

                <span className="ib__sc__month-date__bt-text">
                  <input
                    type="date"
                    className="ib__sc-form-control"
                    onChange={selectWeek}
                    value={selectedWeekStartDate.toISOString().substr(0, 10)}
                  />
                </span>

                <button
                  className="ib__sc__month-date__bt-next ib__sc__np__btn"
                  onClick={() => onWeekChangeNextPrev(1)}
                >
                  <RightIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="ib__sc__header__center">
            {calendarHeaderComponent}
          </div>

          <div className="ib__sc__header__right">
            {/* Add any additional header components here */}
            <CalenderSwitch
            calendarSwitchOptions={calendarSwitchOptions}
            
              calenderType={calenderType}
              handleCalendarTypeChange={handleCalendarTypeChange}
            />
          </div>
        </div>
      </div>

      <div className="calendar">
        <table className="ib__sc__table-team" border={0} cellSpacing="0" cellPadding="0">
          <thead>{renderWeekDaysHeader()}</thead>
          <tbody>
            <CalendarTeamListItems
              teams={teams}
              eventsData={events}
              selectedWeekStartDate={selectedWeekStartDate}
              updateEvent={updateEvent}
              calenderToAddOrUpdateEvent={calenderToAddOrUpdateEvent}
              monthCalenderMinCellHeight={30}
                minimumEventThickness={minimumEventThickness}
                boxHeight={30}
                dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
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

              // ... other props
            />
          </tbody>
        </table>
      </div>
     
    
    </div>
    </EventHandlerContex.Provider>
  );
}

export default CalendarTeam;