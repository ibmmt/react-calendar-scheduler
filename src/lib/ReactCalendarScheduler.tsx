
import React, { useState } from 'react';
import AddEventModal from './AddEventModal';
import CalendarWeek from './CalendarWeek';
import CalendarMonth from './CalenderMonth';
import {
  convertToComponentEventFormat,
  convertToOutputEventFormat,
  formatDate,
  setEventID
} from './_utils';
import './index.css';
import { EventObject, EventObjectInput } from './type/EventObject';


interface Props {
  selectedDate?: Date;
  calenderType?: string;
  monthCalenderTitleFormate?: string;
  monthCalenderTitle?: string;
  monthCalenderDayHeight?: number;
  minimumEventThickness?: number;
  weekHourBoxHeight?: number;
  weekCalenderNextBtnDayIncrement?: number;
  startingWeekday?: number;
  weekCalenderDayStartFromHour?: number;
  weekCalenderVisibleHour?: number;
  weekCalenderTitleFormate?: string;
  calenderHeight?: number;
  weekCalenderTimeFormate?: number;
  monthCalenderMinCellHeight?: number;
  disabaleEventPopup?: boolean;
  disabaleAddEventPopup?: boolean;
  isShowAddNewEventButton?: boolean;
  handleUpdateEvent?: (event: EventObjectInput) => void;
  handleAddNewEvent?: (event: EventObjectInput) => void;
  handleDeleteEvent?: (event: EventObjectInput) => void;
  handleEventClick?: (event: EventObjectInput) => void;
  handleColumnClick?: (event: EventObjectInput) => void;
  handleNextClick?: () => void;
  handlePrevClick?: () => void;
  handleClanderTypeChange?: (type: string) => void;
  handleChangeCurrentDate?: (date: Date,calenderType: string) => void;
  handleIncreaseTimeSpan?: () => void;
  events: EventObjectInput[];
}

function ReactCalendarScheduler({
  selectedDate = new Date(),
  calenderType: _calenderType = 'week', // week or day
  monthCalenderTitleFormate = 'dddd', //month title format
  monthCalenderTitle = 'ddd', //day column title format
  monthCalenderDayHeight = 120, //day column height
  minimumEventThickness = 30, //minimum event thickness
  calenderHeight = 600, //calender height
  weekHourBoxHeight: _weekHourBoxHeight = 50,
  weekCalenderNextBtnDayIncrement = 7, //day increment on next button click
  startingWeekday = 1, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
  weekCalenderDayStartFromHour = 7, //day start from hour,
  weekCalenderVisibleHour = 12, //day visible hour
  weekCalenderTitleFormate = 'ddd, MMM dd', //day column title format
  weekCalenderTimeFormate = 12, //day column title format
  monthCalenderMinCellHeight = 50, //minimum cell height
  disabaleEventPopup = false, //disable event popup
  isShowAddNewEventButton,  //show add new event button
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
  events,
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
  const [calenderType, setCalenderType] = useState(_calenderType);
  const [eventsState, setEventsState] = useState<EventObjectInput[]>(setEventID(events));

  const [weekHourBoxHeight, setWeekHourBoxHeight] =
    useState(_weekHourBoxHeight);

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
      typeof _handleUpdateEvent === 'function' &&
        _handleUpdateEvent(eventsState[index]);

      setEventsState([...eventsState]);
    }
  };

  /**
   * open add event modal
   * @param {EventObject} eventObjEdit
   */
  const calenderToAddOrUpdateEvent = (eventObjEdit: EventObject) => {
    if (eventObjEdit.sc_app__id) {
      typeof _handleEventClick === 'function' &&
        _handleEventClick(convertToOutputEventFormat(eventObjEdit));
    } else {
      typeof _handleColumnClick === 'function' &&
        _handleColumnClick(convertToOutputEventFormat(eventObjEdit));
    }
    if (!disabaleEventPopup && !disabaleAddEventPopup) {
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

      typeof _handleUpdateEvent === 'function' && _handleUpdateEvent(eventObj);
    } else {
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
  const handleDeleteEvent = (sc_app__id: number) => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === sc_app__id,
    );
    _handleDeleteEvent && _handleDeleteEvent({ ...eventsState[index] });
    eventsState.splice(index, 1);
    setEventsState([...eventsState]);
    setIsShowAddEvent(false);
  };

  /**
   * handle calendar type change
   * @param {string} type
   */
  const handleClanderTypeChange = (type: string) => {
    setCalenderType(type);
    _handleClanderTypeChange && _handleClanderTypeChange(type);
  };

  const handleIncreaseTimeSpan = (diff: number) => {
    if (weekHourBoxHeight + diff < 20) {
      return;
    }
    setWeekHourBoxHeight(weekHourBoxHeight + 10 * diff);
    _handleIncreaseTimeSpan && _handleIncreaseTimeSpan();
  };

  return (
    <div className="App react-calender-scedule">
      <div className="ib__sc_rcs-container">
        {/* Add Week Calendar */}
        {/* Week Calendar */}
        {(calenderType === 'week' || calenderType === 'day') && (
          <CalendarWeek
            eventsData={convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy')} // array of events
            selectedDate={selectedDate}
            calenderType={calenderType}
            weekHourBoxHeight={weekHourBoxHeight}
            handleIncreaseTimeSpan={handleIncreaseTimeSpan}
            startingWeekday={startingWeekday} // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
            weekCalenderDayStartFromHour={weekCalenderDayStartFromHour} //day start from hour,
            weekCalenderVisibleHour={weekCalenderVisibleHour} //day visible hour
            weekCalenderTitleFormate={weekCalenderTitleFormate} //day column title format
            weekCalenderTimeFormate={weekCalenderTimeFormate} //day column title format
            minimumEventThickness={minimumEventThickness}
            handleNextClick={_handleNextClick}
            calenderHeight={calenderHeight}
            handlePrevClick={_handlePrevClick}
            weekCalenderNextBtnDayIncrement={
              weekCalenderNextBtnDayIncrement > 7
                ? 7
                : weekCalenderNextBtnDayIncrement
            }
            isShowAddNewEventButton={isShowAddNewEventButton}
            noOfDayColumn={calenderType === 'week' ? 7 : 1}
            handleChangeCurrentDate={_handleChangeCurrentDate}
            handleClanderTypeChange={handleClanderTypeChange}
            updateEvent={updateEventDrag}
            calenderToAddOrUpdateEvent={(eventObj:EventObject) => {
              calenderToAddOrUpdateEvent(eventObj);
            }}
          />
        )}

        {/* Month Calendar */}
        {calenderType === 'month' && (
          <CalendarMonth
            eventsData={convertToComponentEventFormat(setEventID(eventsState), 'dd/MM/yyyy')} // array of events
            monthCalenderDayHeight={monthCalenderDayHeight} // validation 50-100
            selectedDate={selectedDate} // validation date
            dayStartFrom={0} // validation 0-6
            calenderType={calenderType}
            startingWeekday={startingWeekday} // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
            isShowAddNewEventButton={isShowAddNewEventButton}
            currentDay={selectedDate}
            calenderHeight={calenderHeight}
            monthCalenderMinCellHeight={monthCalenderMinCellHeight}
            minimumEventThickness={minimumEventThickness}
            monthCalenderTitleFormate={monthCalenderTitleFormate} //month title format
            monthCalenderTitle={monthCalenderTitle} //day column title format
            handleChangeCurrentDate={_handleChangeCurrentDate}
            updateEvent={updateEventDrag}
            handleClanderTypeChange={handleClanderTypeChange}
            calenderToAddOrUpdateEvent={(eventObj:EventObject) => {
              calenderToAddOrUpdateEvent(eventObj);
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
            handleDeleteEvent={handleDeleteEvent}
            handleAddEvent={handleUpdateOrUpdateEvent}
            eventObj={eventEdit}
          />
        )} 
      </div>
    </div>
  );
}

export default ReactCalendarScheduler;
