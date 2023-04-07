import { useContext, useEffect, useRef, useState } from 'react';
import { EventHandlerContex } from './Calender';

const EventBox = ({
  boxHeight,
  boxTime,
  heightOfWeekColumn,
  event,
  onStartResize,
  boxDay,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const eventRef = useRef();
  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [dragStart] = useContext(EventHandlerContex);

  const handleMouseDownResize = (e, side) => {
    e.preventDefault();
    onStartResize(event, side);
  };

  const handleDragStart = e => {
    setIsDraging(true);
    e.preventDefault();
    console.log(e.target.getBoundingClientRect());
    const { left, top } = e.target.getBoundingClientRect();
    console.log(e.target, e.target.offsetLeft, e.target.offsetTop);

    const x = e.clientX - left;
    const y = e.clientY - top;
    console.log('x', x, 'y', y);

    console.log('e', e, e.offsetX, e.offsetY, boxDay);

    document.body.style.cursor = 'grabbing';
    dragStart(event, y, boxDay);
  };

  const setPostionAndHeight = () => {
    let startTime = event.startTime;
    let endTime = event.endTime;

    const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
    const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);

    if (startTime < boxDayTimeStart) {
      startTime = boxDayTimeStart;
    }
    if (endTime > boxDayTimeEnd) {
      endTime = boxDayTimeEnd;
    }
    const total_event_time = (endTime - startTime) / 3600000;
    console.log('total_event_time', total_event_time);
    const height = (boxHeight / boxTime) * total_event_time;
    setEventHeight(height);
    let hours_difference_from_start = (startTime - boxDayTimeStart) / 3600000;
    let event_top = hours_difference_from_start * (boxHeight / boxTime);
    if (event_top < 0) {
      setEventHeight(height + event_top);
      event_top = 0;
    }
    if (heightOfWeekColumn < height + event_top) {
      setEventHeight(heightOfWeekColumn - event_top);
    }
    setMarginTop(event_top);
  };

  useEffect(() => {
    setPostionAndHeight();
  }, [
    event.startTime,
    event.total_event_time,
    boxHeight,
    boxTime,
    eventHeight,
    heightOfWeekColumn,
  ]);

  const eventStyleWrap = {
    height: eventHeight,
  };

  return (
    <div
      id={event.sc_app__id}
      className={
        'ib-event-wrapper ib-event-wrapper-week ' +
        (isDraging ? 'dragging' : '')
      }
      ref={eventRef}
      onMouseDown={e => handleDragStart(e, event)}
      style={{
        width: event.width + '%',
        left: event.left + '%',
        top: marginTop + 'px',
        resize: 'both',
        cursor: 'move',
        opacity: 1,
        height: eventHeight + 'px',
      }}
    >
      <div className="ib-event-box ib-event-box-week" style={eventStyleWrap}>
        <div
          className="dragging-handler-week top"
          onMouseDown={e => {
            handleMouseDownResize(e, 'top');
          }}
        >
          <EventBoxView event={event} eventHeight={eventHeight} />
        </div>
        <div
          className="dragging-handler-week bottom"
          onMouseDown={e => {
            handleMouseDownResize(e, 'bottom');
          }}
        ></div>
      </div>
    </div>
  );
};

export const EventBoxView = (event, eventHeight) => {
  return (
    <div
      className="ib-event-box ib-event-box-week"
      style={{ height: eventHeight + 'px' }}
    >
      <div className="ib-event ib-event-week">----{event.title}---</div>
    </div>
  );
};

export default EventBox;
