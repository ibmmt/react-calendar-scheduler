import { useEffect, useState } from 'react';
import { AddEventModel } from './AddEventModel';
import CalendarMonth from './CalanderMonth';
import CalendarWeek from './CalendarWeek';
import { formatDate, setEventID } from './_utils';

function ReactCalnaderScedular({ events }) {
  const [isShowAddEvent, setIsShowAddEvent] = useState(false);
  const [eventEdit, setEventEdit] = useState({});
  const [calanderType, setCalanderType] = useState('week');
  const [eventsState, setEventsState] = useState(events);

  useEffect(() => {
    setEventsState(setEventID(events));
  }, [events]);

  //events = events.splice(0, 10);

  console.log('eventsState', eventsState);

  const updateEventDrag = eventObj => {
    const index = eventsState.findIndex(
      event => event.sc_app__id === eventObj.sc_app__id,
    );
    console.log('index', index);
    console.log(
      'eventObj',
      new Date(eventObj.startTime),
      new Date(eventObj.endTime),
    );
    console.log(
      eventsState[index].startTime,
      formatDate(new Date(eventObj.startTime), 'H:mm:ss'),
    );

    eventsState[index] = {
      ...eventsState[index],
      startDate: formatDate(new Date(eventObj.startTime), 'dd/MM/yyyy'),
      endDate: formatDate(new Date(eventObj.endTime), 'dd/MM/yyyy'),
      startTime: formatDate(new Date(eventObj.startTime), 'H:mm:ss'),
      endTime: formatDate(new Date(eventObj.endTime), 'H:mm:ss'),
    };

    setEventsState([...eventsState]);
  };

  const calanderToAddOrUpdateEvent = eventObjEdit => {
    console.log('eventObjEdit', eventObjEdit);
    console.log(
      'eventObj',
      new Date(eventObjEdit.endTime),
      new Date(eventObjEdit.startTime),
      formatDate(new Date(eventObjEdit.startTime), 'H:mm:ss'),
      formatDate(new Date(eventObjEdit.endTime), 'H:mm:ss'),
    );
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
  };

  return (
    <div className="App react-calander-scedule">
      <div className="ib__sc_rcs-container">
        {/* Add Week Calander */}
        <div className="ib__sc__btn-group">
          <button
            className={
              'ib__sc__btn ' + (calanderType === 'calander' ? 'active' : '')
            }
            onClick={() => setCalanderType('calander')}
          >
            Month
          </button>
          <button
            className={
              'ib__sc__btn ' + (calanderType === 'week' ? 'active' : '')
            }
            onClick={() => setCalanderType('week')}
          >
            Week{' '}
          </button>
          <button
            className={
              'ib__sc__btn ' + (calanderType === 'day' ? 'active' : '')
            }
            onClick={() => setCalanderType('day')}
          >
            Day
          </button>
        </div>

        {(calanderType === 'week' || calanderType === 'day') && (
          <CalendarWeek
            eventsData={eventsState} // array of events
            hourBoxHeight={50} // validation 50-100
            NoOfDayColumn={calanderType == 'week' ? 7 : 1} // validation 1-7
            dayStartingFrom={7} // valdiaion 0-23
            dayColumnTitleFormate={'ddd, dd MMM'}
            noOFHoursToShow={14} // validation 1-24
            dateStartFrom={{}} //{parseDate('11/04/2023', 'dd/MM/yyyy')} // validation date
            dayStartFrom={0} // validation 0-6
            calanderType={calanderType}
            updateEvent={updateEventDrag}
            calanderToAddOrUpdateEvent={eventObj => {
              calanderToAddOrUpdateEvent(eventObj);
              setIsShowAddEvent(true);
            }}
          />
        )}
        {calanderType === 'calander' && (
          <CalendarMonth
            eventsData={eventsState} // array of events
            hourBoxHeight={50} // validation 50-100
            NoOfDayColumn={calanderType == 'week' ? 7 : 1} // validation 1-7
            dayStartingFrom={7} // valdiaion 0-23
            dayColumnTitleFormate={'ddd, dd MMM'}
            currentDate={new Date()}
            noOFHoursToShow={14} // validation 1-24
            dateStartFrom={{}} //{parseDate('11/04/2023', 'dd/MM/yyyy')} // validation date
            dayStartFrom={0} // validation 0-6
            calanderType={calanderType}
            updateEvent={updateEventDrag}
            calanderToAddOrUpdateEvent={eventObj => {
              calanderToAddOrUpdateEvent(eventObj);
              setIsShowAddEvent(true);
            }}
          />
        )}

        {/* Add event modal */}
        {isShowAddEvent && (
          <AddEventModel
            show={isShowAddEvent}
            handleClose={() => {
              setIsShowAddEvent(false);
            }}
            handleAddEvent={eventObj => {
              if (eventObj.sc_app__id) {
                for (let i = 0; i < eventsState.length; i++) {
                  if (eventsState[i].sc_app__id === eventObj.sc_app__id) {
                    eventsState[i] = { ...eventObj };
                    break;
                  }
                }
              } else {
                eventObj.sc_app__id = new Date().getTime();
                eventsState.push(eventObj);
              }
              setEventsState([...eventsState]);
              setIsShowAddEvent(false);

              //---TODO: submite event to server
            }}
            eventObj={eventEdit}
          />
        )}
      </div>
    </div>
  );
}

export default ReactCalnaderScedular;
