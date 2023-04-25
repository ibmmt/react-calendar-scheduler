import { useState } from 'react';
import { AddEventModal } from './AddEventModal';
import CalendarMonth from './CalanderMonth';
import CalendarWeek from './CalendarWeek';
import {
  formatDate,
  formateEventDateAndTimeForOUtput,
  setEventID,
} from './_utils';

function ReactCalnaderScheduler({
  events = [],
  selectedDate = new Date(),
  calanderType: _calanderType = 'week', // week or day
  monthCalanderTitleFormate = 'dddd', //month title formate
  monthCalanderTitle = 'ddd', //day column title formate
  monthCalanderDayHeight = 50, //day column title formate
  minimumEventThickness = 30, //minimum event thickness
  weekHourBoxHeight = 50,
  startingWeekday = 1, // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
  weekCalanderDayStartFromHour = 7, //day start from hour,
  weekCalanderVisibleHour = 12, //day visible hour
  weekCalanderTitleFormate = 'ddd, MMM dd', //day column title formate
  weekCalanderTimeFormate = 12, //day column title formate
  monthCalanderMinCellHeight = 50,
  disabaleEventPopup = false,
  //hideAddEventButton = false,
  // disableAddEvent = false, //disable add event
  // disabaleEventPopup = false, //disable event popup
  // isShowAddNewEventButton = true, //show add new event button
  //isShowAddOrUpadateEventButton = true, //show add or update event button
  handleUpdateEvent: _handleUpdateEvent,
  handleAddNewEvent: _handleAddNewEvent,
  handleDeleteEvent: _handleDeleteEvent,
  handleEventClick: _handleEventClick,
  handleColumnClick: _handleColumnClick,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  handleClanderTypeChange: _handleClanderTypeChange,
  handleChangeCurrentDate: _handleChangeCurrentDate,
}) {
  const [isShowAddEvent, setIsShowAddEvent] = useState(false);
  const [eventEdit, setEventEdit] = useState({});
  const [calanderType, setCalanderType] = useState(_calanderType);
  const [eventsState, setEventsState] = useState(setEventID(events));

  /**
   * set event id for events
   */
  // useEffect(() => {
  //   setEventsState(setEventID(events));
  // }, [events]);

  /**
   * update event while dragin or resizing
   * @param {EventObject} eventObj
   */
  const updateEventDrag = eventObj => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === eventObj.sc_app__id,
    );

    eventsState[index] = formateEventDateAndTimeForOUtput(eventObj);
    typeof _handleUpdateEvent === 'function' &&
      _handleUpdateEvent(eventsState[index]);

    setEventsState([...eventsState]);
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
    if (!disabaleEventPopup) {
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

  return (
    <div className="App react-calander-scedule">
      <div className="ib__sc_rcs-container">
        {/* Add Week Calander */}
        <div className="ib__sc__btn-group">
          <button
            className={
              'ib__sc__btn ib_sc_btn_month ' +
              (calanderType === 'month' ? 'active' : '')
            }
            onClick={() => handleClanderTypeChange('month')}
          >
            Month
          </button>
          <button
            className={
              'ib__sc__btn ib_sc_btn_week ' +
              (calanderType === 'week' ? 'active' : '')
            }
            onClick={() => handleClanderTypeChange('week')}
          >
            Week{' '}
          </button>
          <button
            className={
              'ib__sc__btn ib_sc_btn_day ' +
              (calanderType === 'day' ? 'active' : '')
            }
            onClick={() => handleClanderTypeChange('day')}
          >
            Day
          </button>
        </div>

        {/*  Week Calander */}

        {(calanderType === 'week' || calanderType === 'day') && (
          <CalendarWeek
            eventsData={eventsState} // array of events
            selectedDate={selectedDate}
            calanderType={calanderType}
            weekHourBoxHeight={weekHourBoxHeight}
            startingWeekday={startingWeekday} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
            weekCalanderDayStartFromHour={weekCalanderDayStartFromHour} //day start from hour,
            weekCalanderVisibleHour={weekCalanderVisibleHour} //day visible hour
            weekCalanderTitleFormate={weekCalanderTitleFormate} //day column title formate
            weekCalanderTimeFormate={weekCalanderTimeFormate} //day column title formate
            minimumEventThickness={minimumEventThickness}
            handleNextClick={_handleNextClick}
            handlePrevClick={_handlePrevClick}
            noOfDayColumn={calanderType == 'week' ? 7 : 1}
            handleChangeCurrentDate={_handleChangeCurrentDate}
            updateEvent={updateEventDrag}
            calanderToAddOrUpdateEvent={eventObj => {
              calanderToAddOrUpdateEvent(eventObj);
              setIsShowAddEvent(true);
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
            calanderToAddOrUpdateEvent={eventObj => {
              calanderToAddOrUpdateEvent(eventObj);
              setIsShowAddEvent(true);
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
