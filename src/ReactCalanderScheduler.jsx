import React, { useEffect, useState } from 'react';
import { AddEventModal } from './AddEventModal';
import CalendarMonth from './CalanderMonth';
import CalendarWeek from './CalendarWeek';
import {
  formatDate,
  formateEventDateAndTimeForOUtput,
  setEventID,
} from './_utils';
import './index.css';

function ReactCalnaderScheduler({
  selectedDate = new Date(),
  calanderType: _calanderType = 'week', // week or day
  monthCalanderTitleFormate = 'dddd', //month title formate
  monthCalanderTitle = 'ddd', //day column title formate
  monthCalanderDayHeight = 120, //day column title formate
  minimumEventThickness = 30, //minimum event thickness
  weekHourBoxHeight: _weekHourBoxHeight = 50,
  weekCalanderNextBtnDayIncrement = 7, //day increment on next button click
  startingWeekday = 1, // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
  weekCalanderDayStartFromHour = 7, //day start from hour,
  weekCalanderVisibleHour = 12, //day visible hour
  weekCalanderTitleFormate = 'ddd, MMM dd', //day column title formate
  weekCalanderTimeFormate = 12, //day column title formate
  monthCalanderMinCellHeight = 50,
  disabaleEventPopup = false,
  disabaleAddEventPopup = false,
  handleUpdateEvent: _handleUpdateEvent,
  handleAddNewEvent: _handleAddNewEvent,
  handleDeleteEvent: _handleDeleteEvent,
  handleEventClick: _handleEventClick,
  handleColumnClick: _handleColumnClick,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  handleClanderTypeChange: _handleClanderTypeChange,
  handleChangeCurrentDate: _handleChangeCurrentDate,
  handleIncreaseTimeSpan: _handleIncreaseTimeSpan,
  events,
}) {
  /**
   * set event id for events
   */

  const [isShowAddEvent, setIsShowAddEvent] = useState(false);
  const [eventEdit, setEventEdit] = useState({});
  const [calanderType, setCalanderType] = useState(_calanderType);
  const [eventsState, setEventsState] = useState(setEventID(events));

  const [weekHourBoxHeight, setWeekHourBoxHeight] =
    useState(_weekHourBoxHeight);

  useEffect(() => {
    setEventsState(setEventID(events));
  }, [events]);

  /**
   * update event while dragin or resizing
   * @param {EventObject} eventObj
   */
  const updateEventDrag = eventObj => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === eventObj.sc_app__id,
    );
    const newEvent = formateEventDateAndTimeForOUtput(eventObj);
    if (
      newEvent['startDate'] !== eventsState[index]['startDate'] ||
      newEvent['endDate'] !== eventsState[index]['endDate'] ||
      newEvent['startTime'] !== eventsState[index]['startTime'] ||
      newEvent['endTime'] !== eventsState[index]['endTime']
    ) {
      eventsState[index] = newEvent;
      typeof _handleUpdateEvent === 'function' &&
        _handleUpdateEvent(eventsState[index]);

      setEventsState([...eventsState]);
    }
  };

  /**
   * open add event modal
   * @param {Event} eventObjEdit
   */
  const calanderToAddOrUpdateEvent = eventObjEdit => {
    if (eventObjEdit.sc_app__id) {
      typeof _handleEventClick === 'function' &&
        _handleEventClick(formateEventDateAndTimeForOUtput(eventObjEdit));
    } else {
      typeof _handleColumnClick === 'function' &&
        _handleColumnClick(formateEventDateAndTimeForOUtput(eventObjEdit));
    }
    if (!disabaleEventPopup && !disabaleAddEventPopup) {
      setEventEdit({
        ...eventObjEdit,
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
   * @param {Event} eventObj
   */
  const handleUpdateOrUpdateEvent = eventObj => {
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
  const handleDeleteEvent = sc_app__id => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === sc_app__id,
    );
    _handleDeleteEvent && _handleDeleteEvent({ ...eventsState[index] });
    eventsState.splice(index, 1);
    setEventsState([...eventsState]);
    setIsShowAddEvent(false);
  };

  /**
   * handle calander type change
   * @param {string} type
   */

  const handleClanderTypeChange = type => {
    setCalanderType(type);
    _handleClanderTypeChange && _handleClanderTypeChange(type);
  };

  const handleIncreaseTimeSpan = diff => {
    if (weekHourBoxHeight + diff < 20) {
      return;
    }
    setWeekHourBoxHeight(weekHourBoxHeight + 10 * diff);
    _handleIncreaseTimeSpan && _handleIncreaseTimeSpan();
  };

  return (
    <div className="App react-calander-scedule">
      <div className="ib__sc_rcs-container">
        {/* Add Week Calander */}

        {/*  Week Calander */}

        {(calanderType === 'week' || calanderType === 'day') && (
          <CalendarWeek
            eventsData={eventsState} // array of events
            selectedDate={selectedDate}
            calanderType={calanderType}
            weekHourBoxHeight={weekHourBoxHeight}
            handleIncreaseTimeSpan={handleIncreaseTimeSpan}
            startingWeekday={startingWeekday} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
            weekCalanderDayStartFromHour={weekCalanderDayStartFromHour} //day start from hour,
            weekCalanderVisibleHour={weekCalanderVisibleHour} //day visible hour
            weekCalanderTitleFormate={weekCalanderTitleFormate} //day column title formate
            weekCalanderTimeFormate={weekCalanderTimeFormate} //day column title formate
            minimumEventThickness={minimumEventThickness}
            handleNextClick={_handleNextClick}
            handlePrevClick={_handlePrevClick}
            weekCalanderNextBtnDayIncrement={
              weekCalanderNextBtnDayIncrement > 7
                ? 7
                : weekCalanderNextBtnDayIncrement
            }
            noOfDayColumn={calanderType == 'week' ? 7 : 1}
            handleChangeCurrentDate={_handleChangeCurrentDate}
            handleClanderTypeChange={handleClanderTypeChange}
            updateEvent={updateEventDrag}
            calanderToAddOrUpdateEvent={eventObj => {
              calanderToAddOrUpdateEvent(eventObj);
            }}
          />
        )}

        {/*  Month Calander */}
        {calanderType === 'month' && (
          <CalendarMonth
            eventsData={eventsState} // array of events
            monthCalanderDayHeight={monthCalanderDayHeight} // validation 50-100
            selectedDate={selectedDate} //{parseDate('11/04/2023', 'dd/MM/yyyy')} // validation date
            dayStartFrom={0} // validation 0-6
            calanderType={calanderType}
            startingWeekday={startingWeekday} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
            handleNextClick={_handleNextClick}
            handlePrevClick={_handlePrevClick}
            monthCalanderMinCellHeight={monthCalanderMinCellHeight}
            minimumEventThickness={minimumEventThickness}
            monthCalanderTitleFormate={monthCalanderTitleFormate} //month title formate
            monthCalanderTitle={monthCalanderTitle} //day column title formate
            handleChangeCurrentDate={_handleChangeCurrentDate}
            updateEvent={updateEventDrag}
            handleClanderTypeChange={handleClanderTypeChange}
            calanderToAddOrUpdateEvent={eventObj => {
              calanderToAddOrUpdateEvent(eventObj);
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

export default ReactCalnaderScheduler;
