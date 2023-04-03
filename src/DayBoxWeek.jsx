import React, { useRef, useState } from 'react';
import EventBox from './EventBox';
import ResizeEvent from './ResizeEvent';

// let boxHeight = 50;
// let boxTime = 1; //1 hr

const DayBoxWeek = ({
  events,

  boxHeight,
  boxTime,
  boxDay,
  updateEvents,
  heightOfWeekColumn,
  calanderTableRef,
}) => {
  if (events && events.length) {
    console.log('events', events);
  }
  console.log('events', events);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingEvent, setResizingEvent] = useState({});
  const [resizingSide, setResizingSide] = useState('');
  const onStartResize = (event, side) => {
    setIsResizing(true);
    console.log('onStartResize', event, side);
    setResizingEvent(event);
    setResizingSide(side);
  };
  const updateEvent = event => {
    console.log('updateEvent', event);
    for (let i = 0; i < events.length; i++) {
      if (events[i].sc_app__id === event.sc_app__id) {
        events[i] = event;
      }
    }
    setIsResizing(false);
    updateEvents(events);
  };

  const BoxRef = useRef();
  return (
    <div ref={BoxRef} className="ib-cell ib-cell-week">
      <div className="ib-cell-wrapper ib-cell-wrapper-week">
        {!!events &&
          !!events.length &&
          events.map(event => (
            <EventBox
              key={event.sc_app__id}
              event={event}
              boxDay={boxDay}
              onStartResize={onStartResize}
              calanderTableRef={calanderTableRef}
              boxHeight={boxHeight}
              boxTime={boxTime}
              heightOfWeekColumn={heightOfWeekColumn}
              updateEvent={updateEvent}
            />
          ))}
        {isResizing && (
          <ResizeEvent
            event={resizingEvent}
            boxDay={boxDay}
            side={resizingSide}
            boxHeight={boxHeight}
            calanderTableRef={calanderTableRef}
            boxTime={boxTime}
            heightOfWeekColumn={heightOfWeekColumn}
            updateEvent={updateEvent}
          />
        )}
        {[...Array(24).keys()].map((hour, index) => (
          <div
            key={index}
            style={{ height: boxHeight + 'px' }}
            className="ib-table-hr-box-week"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DayBoxWeek;
