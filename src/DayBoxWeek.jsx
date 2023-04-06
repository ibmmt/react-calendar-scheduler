import React, { useRef, useState } from 'react';
import DragingEvent from './DragingEvent';
import EventBox from './EventBox';
import ResizeEvent from './ResizeEvent';

// let boxHeight = 50;
// let boxTime = 1; //1 hr

const DayBoxWeek = ({
  events,
  draggingEvent,
  boxHeight,
  boxTime,
  boxDay,
  updateEvents,
  heightOfWeekColumn,
  calanderTableRef,
}) => {
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
    <>
      {/* <div className="ib-table-th">
        {formatDate(new Date(boxDay), 'dd/MMM/yyyy')}
      </div> */}
      <div
        ref={BoxRef}
        className="ib-cell ib-cell-week"
        // onDragOver={e => {
        //   console.log('onDragOver', e);
        //   console.log('onDragOver', e.target);
        //   console.log('onDragOver', e.target.offsetWidth);
        // }}
      >
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
          {draggingEvent && draggingEvent.sc_app__id && (
            <>
              <DragingEvent
                event={draggingEvent}
                color="red"
                boxHeight={boxHeight}
                boxTime={boxTime}
                heightOfWeekColumn={heightOfWeekColumn}
                updateEvent={events => {
                  //setEvents(calculatePositions(events));
                  console.log('updateEvents', events);
                }}
              />
            </>
          )}
          {[...Array(24).keys()].map((hour, index) => (
            <div
              key={index}
              style={{ height: boxHeight + 'px', draggable: 'true' }}
              className="ib-table-hr-box-week"
              data-date={boxDay}
              data-day={boxDay.getDay()}
              data-month={boxDay.getMonth()}
              data-year={boxDay.getFullYear()}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DayBoxWeek;
