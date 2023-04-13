import { useEffect, useState } from 'react';
import { AddEventModel } from './AddEventModel';
import CalendarWeek from './CalendarWeek';
import { formatDate, parseDate, setEventID } from './_utils';

function ReactCalnaderScedular({ events }) {
  const [isShowAddEvent, setIsShowAddEvent] = useState(false);
  const [eventEdit, setEventEdit] = useState({});

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
    <div className="App">
      <div className="container">
        <button onClick={() => setIsShowAddEvent(true)}>Add Event</button>

        {/* Add Week Calander */}
        <CalendarWeek
          events={eventsState} // array of events
          hourBoxHeight={50} // validation 50-100
          NoOfDayColumn={7} // validation 1-7
          dayStartingFrom={7} // valdiaion 0-23
          dayColumnTitleFormate={'ddd, dd MMM'}
          noOFHoursToShow={14} // validation 1-24
          dateStartFrom={parseDate('11/04/2023', 'dd/MM/yyyy')} // validation date
          updateEvent={updateEventDrag}
          calanderToAddOrUpdateEvent={eventObj => {
            calanderToAddOrUpdateEvent(eventObj);
            setIsShowAddEvent(true);
          }}
        />

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
