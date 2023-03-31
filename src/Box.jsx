import React from 'react';

// let boxHeight = 50;
// let boxTime = 1; //1 hr

const Event = ({
  title,
  boxHeight,
  boxTime,
  heightOfWeekColumn,
  startTime,
  total_event_time,
  event,
}) => {
  const startTimeObj = new Date(startTime);
  //const boxStartTimeObj = new Date(boxStartTime);
  const daystartTime = new Date(startTimeObj).setHours(0, 0, 0, 0);
  //const dayEndTime = new Date(startTimeObj).setHours(23, 59, 59, 999);
  console.log('daystartTime', daystartTime);
  console.log('Date.parse(daystartTime)', Date.parse(new Date(daystartTime)));

  let hours_difrrence_from_start =
    (Date.parse(startTimeObj) - Date.parse(new Date(daystartTime))) / 3600000;

  let eventHeight = (boxHeight / boxTime) * total_event_time;
  let event_top = hours_difrrence_from_start * (boxHeight / boxTime);
  if (event_top < 0) {
    eventHeight = eventHeight + event_top;
    event_top = 0;
  }
  if (heightOfWeekColumn < eventHeight + event_top) {
    eventHeight = heightOfWeekColumn - event_top;
  }

  const eventStyleWrap = {
    height: eventHeight,
    // marginTop: event_top,
  };
  return (
    <div
      className="ib-event-wrapper"
      style={{
        width: event.width + '%',
        left: event.left + '%',
        top: event_top + 'px',
        height: eventHeight + 'px',
      }}
    >
      <div className="ib-event-box" style={eventStyleWrap}>
        <div className="ib-event">{title}</div>
      </div>
    </div>
  );
};

const Box = ({
  onDropEvent,
  events,
  boxStartTime,
  boxHeight,
  boxTime,
  heightOfWeekColumn,
}) => {
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
              boxHeight={boxHeight}
              boxTime={boxTime}
              heightOfWeekColumn={heightOfWeekColumn}
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
