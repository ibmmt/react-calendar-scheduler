
import React, { useState } from 'react';
import AddEventModal from './AddEventModal';
import CalendarMonth from './CalendarMonth';
import CalendarTeam from './CalendarTeam';
import CalendarWeek from './CalendarWeek';
import {
  convertToComponentEventFormat,
  convertToOutputEventFormat,
  formatDate,
  setEventID
} from './_utils';
import './index.css';
import { CalenderType } from './type/Calendar';
import { EventObject, EventObjectInput } from './type/EventObject';
import { Team } from './type/team';


interface Props {
  selectedDate?: Date;
  calendarType?: CalenderType;
  monthViewDayTitleFormat?:  "long" | "short" | ((day:string) => React.ReactNode);

  monthViewDayHeight?: number;
  minimumEventHeight?: number;
  weekHourCellHeight?: number;
  weekViewNextButtonDayIncrement?: number;
  startingWeekday?: number;
  weekViewStartHour?: number;
  weekViewVisibleHours?: number;
  weekViewDayTitleFormat?: string | ((date: Date) => React.ReactNode);
  calendarHeight?: number;
  weekViewTimeFormat?: number;
  monthViewMinCellHeight?: number;
  disableEventModal?: boolean;
  disableAddEventModal?: boolean;
  showAddNewEventButton?: boolean;
  calendarHeader?: React.ReactNode;
  onUpdateEvent?: (event: EventObjectInput) => void;
  onAddEvent?: (event: EventObjectInput) => void;
  onDeleteEvent?: (event: EventObjectInput) => void;
  onEventClick?: (event: EventObjectInput) => void;
  onColumnClick?: (event: EventObjectInput) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onCalendarTypeChange?: (type: CalenderType) => void;
  onDateChange?: (date: Date,calendarType: CalenderType) => void;
  onIncreaseTimeSpan?: () => void;
  teams?: Team[];
  events: EventObjectInput[];
  calendarViewOptions?:CalenderType[] 
}

function ReactCalendarScheduler({
  // next
  selectedDate = new Date(),
  calendarType: _calendarType = 'week', // week or day

  monthViewDayHeight = 120, //day column height
  minimumEventHeight = 30, //minimum event thickness
  calendarHeight = 600, //calendar height
  weekHourCellHeight: _weekHourCellHeight = 50,
  weekViewNextButtonDayIncrement = 7, //day increment on next button click
  startingWeekday = 1, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
  weekViewStartHour = 7, //day start from hour,
  weekViewVisibleHours = 12, //day visible hour
  weekViewDayTitleFormat = 'ddd, MMM dd', //day column title format
  weekViewTimeFormat = 12, //day column title format
  monthViewMinCellHeight = 50, //minimum cell height
  disableEventModal = false, //disable event modal
  showAddNewEventButton,  //show add new event button
  calendarHeader, //calendar header component
  disableAddEventModal = false, //disable add event modal
  onUpdateEvent: _onUpdateEvent, //update event
  onAddEvent: _onAddEvent, //add new event
  onDeleteEvent: _onDeleteEvent, //delete event
  onEventClick: _onEventClick, //event click
  onColumnClick: _onColumnClick, //column click
  onNextClick: _onNextClick, //next button click
  onPrevClick: _onPrevClick, //prev button click
  onCalendarTypeChange: _onCalendarTypeChange, //calendar type change
  onDateChange: _onDateChange, //change current date
  onIncreaseTimeSpan: _onIncreaseTimeSpan, //increase time span
  events,
  teams=[],
  calendarViewOptions=['week','day','month','team'],
  monthViewDayTitleFormat="short"
}: Props) {
  /**
   * set event id for events
   */
  const [isShowAddEvent, setIsShowAddEvent] = useState(false);
  const [eventEdit, setEventEdit] = useState<EventObjectInput>({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [calendarType, setCalenderType] = useState(_calendarType);
  const [eventsState, setEventsState] = useState<EventObjectInput[]>(setEventID(events));

  const [weekHourCellHeight, setWeekHourBoxHeight] =
    useState(_weekHourCellHeight);

  React.useEffect(() => {
    setEventsState(setEventID(events));
  }, [events]);

  /**
   * update event while dragging or resizing
   * @param {EventObject} eventObj
   */
  const updateEventDrag = (eventObj: EventObject) => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === eventObj.sc_app__id,
    );
    const newEvent = convertToOutputEventFormat(eventObj);
    if (
      newEvent.startDate !== eventsState[index].startDate ||
      newEvent.endDate !== eventsState[index].endDate ||
      newEvent.startTime !== eventsState[index].startTime ||
      newEvent.endTime !== eventsState[index].endTime
    ) {
      eventsState[index] = newEvent;
      typeof _onUpdateEvent === 'function' &&
        _onUpdateEvent(eventsState[index]);

      setEventsState([...eventsState]);
    }
  };

  /**
   * open add event modal
   * @param {EventObject} eventObjEdit
   */
  const calendarToAddOrUpdateEvent = (eventObjEdit: EventObject) => {
    if (eventObjEdit.sc_app__id) {
      typeof _onEventClick === 'function' &&
        _onEventClick(convertToOutputEventFormat(eventObjEdit));
    } else {
      typeof _onColumnClick === 'function' &&
        _onColumnClick(convertToOutputEventFormat(eventObjEdit));
    }
    if (!disableEventModal && !disableAddEventModal) {
      setEventEdit({
        ...convertToOutputEventFormat(eventObjEdit),
        startDate: eventObjEdit.startTime
          ? formatDate(new Date(eventObjEdit.startTime), 'yyyy-MM-dd')
          : '',
        endDate: eventObjEdit.endTime
          ? formatDate(new Date(eventObjEdit.endTime), 'yyyy-MM-dd')
          : '',
        startTime: eventObjEdit.startTime
          ? formatDate(new Date(eventObjEdit.startTime), 'H:mm:ss')
          : '',
        endTime: eventObjEdit.endTime
          ? formatDate(new Date(eventObjEdit.endTime), 'H:mm:ss')
          : '',
      });

      setIsShowAddEvent(true);
    }
  };

  /**
   * handle add or update event
   * @param {EventObject} eventObj
   */
  const handleUpdateOrUpdateEvent = (eventObj: EventObjectInput) => {
    if (eventObj.sc_app__id) {
      for (let i = 0; i < eventsState.length; i++) {
        if (eventsState[i].sc_app__id === eventObj.sc_app__id) {
          eventsState[i] = { ...eventObj };
          break;
        }
      }

      typeof _onUpdateEvent === 'function' && _onUpdateEvent(eventObj);
    } else {
      eventObj.sc_app__id = new Date().getTime();
      typeof _onAddEvent === 'function' && _onAddEvent(eventObj);
      eventsState.push(eventObj);
    }

    setEventsState([...eventsState]);
    setIsShowAddEvent(false);
  };

  /**
   * handle delete event
   * @param {Number} sc_app__id
   */
  const onDeleteEvent = (sc_app__id: number) => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === sc_app__id,
    );
    _onDeleteEvent && _onDeleteEvent({ ...eventsState[index] });
    eventsState.splice(index, 1);
    setEventsState([...eventsState]);
    setIsShowAddEvent(false);
  };

  /**
   * handle calendar type change
   * @param {string} type
   */
  const onCalendarTypeChange = (type:CalenderType) => {
    setCalenderType(type);
    _onCalendarTypeChange && _onCalendarTypeChange(type);
  };

  const onIncreaseTimeSpan = (diff: number) => {
    if (weekHourCellHeight + diff < 20) {
      return;
    }
    setWeekHourBoxHeight(weekHourCellHeight + 10 * diff);
    _onIncreaseTimeSpan && _onIncreaseTimeSpan();
  };

  return (
    <div className="App react-calendar-scedule">
      <div className="ib__sc_rcs-container">
        {/* Add Week Calendar */}
        {/* Week Calendar */}
        {(calendarType === 'week' || calendarType === 'day') && (
          <CalendarWeek
            eventsData={convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy')} // array of events
            selectedDate={selectedDate}
            calendarType={calendarType}
            weekHourCellHeight={weekHourCellHeight}
            calendarHeader={calendarHeader}
            onIncreaseTimeSpan={onIncreaseTimeSpan}
            startingWeekday={startingWeekday} // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
            weekViewStartHour={weekViewStartHour} //day start from hour,
            weekViewVisibleHours={weekViewVisibleHours} //day visible hour
            weekViewDayTitleFormat={weekViewDayTitleFormat} //day column title format
            weekViewTimeFormat={weekViewTimeFormat} //day column title format
            minimumEventHeight={minimumEventHeight}
            onNextClick={_onNextClick}
            calendarHeight={calendarHeight}
            onPrevClick={_onPrevClick}
            
            calendarViewOptions={calendarViewOptions}
            weekViewNextButtonDayIncrement={
              weekViewNextButtonDayIncrement > 7
                ? 7
                : weekViewNextButtonDayIncrement
            }
            showAddNewEventButton={showAddNewEventButton}
            noOfDayColumn={calendarType === 'week' ? 7 : 1}
            onDateChange={_onDateChange}
            onCalendarTypeChange={onCalendarTypeChange}
            updateEvent={updateEventDrag}
            calendarToAddOrUpdateEvent={(eventObj:EventObject) => {
              calendarToAddOrUpdateEvent(eventObj);
            }}
          />
        )}

{calendarType === 'team' && (!teams||!teams.length)&& (<div className='ib__sc__no team'>No Team Found</div>

)}
{calendarType === 'team' && !!teams?.length&& (
          <CalendarTeam
            eventsData={convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy')}
            teams={teams}
            selectedDate={selectedDate}
            calendarType={calendarType}
            calendarViewOptions={calendarViewOptions}
            calendarHeader={calendarHeader}
            showAddNewEventButton={showAddNewEventButton}
            weekViewDayTitleFormat={weekViewDayTitleFormat}
            
            // ... other props
            onDateChange={_onDateChange}
            updateEvent={updateEventDrag}
            onCalendarTypeChange={onCalendarTypeChange}
             
            calendarToAddOrUpdateEvent={(eventObj:EventObject) => {
              calendarToAddOrUpdateEvent(eventObj);
            }}
            
            onNextClick={_onNextClick}
            onPrevClick={_onPrevClick}
          />
        )}



        {/* Month Calendar */}
        {calendarType === 'month' && (
          <CalendarMonth
            eventsData={convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy')} // array of events
            monthViewDayHeight={monthViewDayHeight} // validation 50-100
            selectedDate={selectedDate} // validation date
            dayStartFrom={0} // validation 0-6
            calendarType={calendarType}
            startingWeekday={startingWeekday} // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
            showAddNewEventButton={showAddNewEventButton}
            currentDay={selectedDate}
            calendarHeight={calendarHeight}
            calendarHeader={calendarHeader}
            monthViewMinCellHeight={monthViewMinCellHeight}
            minimumEventHeight={minimumEventHeight}
            calendarViewOptions={calendarViewOptions}
           monthViewDayTitleFormat={monthViewDayTitleFormat}
      
            onDateChange={_onDateChange}
            updateEvent={updateEventDrag}
            onCalendarTypeChange={onCalendarTypeChange}
            calendarToAddOrUpdateEvent={(eventObj:EventObject) => {
              calendarToAddOrUpdateEvent(eventObj);
            }}
          />
        )}

        {/* Add event modal */}
        {isShowAddEvent && (
          <AddEventModal
            show={isShowAddEvent}
            handleClose={() => {
              setIsShowAddEvent(false);
            }}
            onDeleteEvent={onDeleteEvent}
            handleAddEvent={handleUpdateOrUpdateEvent}
            eventObj={eventEdit}
          />
        )} 
      </div>
    </div>
  );
}

export default ReactCalendarScheduler;
