import React from 'react';

let boxHeight = 50;
let boxTime = 1; //1 hr

const Event = ({
  title,

  boxStartTime,
  startTime,
  total_event_time,
  event,
}) => {
  const startTimeObj = new Date(startTime);
  const boxStartTimeObj = new Date(boxStartTime);

  let hours_difrrence_from_box_start =
    (Date.parse(startTimeObj) - Date.parse(boxStartTimeObj)) / 3600000;

  let eventHeight = (boxHeight / boxTime) * total_event_time;
  let event_top = hours_difrrence_from_box_start * boxHeight;

  const eventStyleWrap = {
    height: eventHeight,
    marginTop: event_top,
  };
  return (
    <div
      className="ib-event-wrapper"
      style={{ width: event.width + '%', left: event.left + '%' }}
    >
      <div className="ib-event-box" style={eventStyleWrap}>
        <div className="ib-event">{title}</div>
      </div>
    </div>
  );
};

const Box = ({ onDropEvent, events, boxStartTime }) => {
  if (events && events.length) {
    console.log('events', events);
  }
  return (
    <div className="ib-cell">
      <div className="ib-cell-wrapper">
        {!!events &&
          !!events.length &&
          events.map(event => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              startTime={event.startTime}
              mid={event.mid}
              event={event}
              boxStartTime={boxStartTime}
              total_event_time={event.total_event_time}
              onDropEvent={onDropEvent}
            />
          ))}
      </div>
    </div>
  );
};

export default Box;
