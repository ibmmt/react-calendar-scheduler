import { useContext, useEffect, useRef, useState } from 'react';
import { EventHandlerContex } from './Calender';

const EventBox = ({
  boxHeight,
  boxTime,
  heightOfWeekColumn,
  eventObj,
  //onStartResize,
  boxDay,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const eventRef = useRef();
  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ top: false, bottom: false });
  const newEventTime = useRef({ start: 0, end: 0 });
  const [updateEvent] = useContext(EventHandlerContex);
  const lastCleintYRef = useRef(0);
  const sideRef = useRef('');

  const handleMouseDownResize = (e, side) => {
    e.preventDefault();
    setIsResizing(true);
    sideRef.current = side;
    updateEvent({
      ...eventObj,
      startTime: newEventTime.current.start,
      endTime: newEventTime.current.end,
    });
    // onStartResize(event, side);
  };

  const handleDragStart = e => {
    setIsDraging(true);
    e.preventDefault();
    console.log(e.target.getBoundingClientRect());

    document.body.style.cursor = 'grabbing';
    // dragStart(event, 0, boxDay);
  };

  const setPostionAndHeight = (startTime, endTime) => {
    const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
    const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);
    newEventTime.current.start = startTime;
    newEventTime.current.end = endTime;

    if (startTime < boxDayTimeStart) {
      startTime = boxDayTimeStart;
      setOverLap({ ...overLap, top: true });
    }
    if (endTime > boxDayTimeEnd) {
      endTime = boxDayTimeEnd;
      setOverLap({ ...overLap, bottom: true });
    }
    const total_event_time = (endTime - startTime) / 3600000;
    console.log('total_event_time', total_event_time);
    const height = (boxHeight / boxTime) * total_event_time;
    setEventHeight(height);
    let hours_difference_from_start = (startTime - boxDayTimeStart) / 3600000;
    let event_top = hours_difference_from_start * (boxHeight / boxTime);
    // console.log('top-----------------', event_top);
    // if (event_top < 0) {

    //   setEventHeight(height + event_top);
    //   event_top = 0;
    // }
    // if (heightOfWeekColumn < height + event_top) {
    //   setOverLap({ ...overLap, bottom: true });
    //   setEventHeight(heightOfWeekColumn - event_top);
    // }
    setMarginTop(event_top);
  };

  const resizeEventFun = (diff, side) => {
    console.log('setHeightAndTop', diff, side);

    //   2 * 100;
    console.log('down', diff); //1diff= boxHeight/boxTime

    if (side === 'top') {
      eventObj.startTime =
        eventObj.startTime + (diff / boxHeight) * boxTime * 3600000;
      setPostionAndHeight(eventObj.startTime, eventObj.endTime);
    }
    if (side === 'bottom') {
      eventObj.endTime =
        eventObj.endTime + (diff / boxHeight) * boxTime * 3600000;
      setPostionAndHeight(eventObj.startTime, eventObj.endTime);
    }
  };

  const handleMouseMove = e => {
    console.log('handleMouseMove');
    if (!isResizing) return;

    if (lastCleintYRef.current == 0) {
      lastCleintYRef.current = e.clientY;
      return;
    }

    const diff = e.clientY - lastCleintYRef.current;

    if (diff > 10 || diff < -10) {
      console.log('diff', diff, sideRef.current);
      resizeEventFun(diff, sideRef.current);
      lastCleintYRef.current = e.clientY;
    }
  };
  const handleMouseUp = e => {
    if (!isResizing) return;
    e.preventDefault();
    updateEvent(eventObj);
    setIsResizing(false);
  };

  useEffect(() => {
    if (!isResizing || !eventRef.current) return;
    console.log('useEffect', eventRef.current);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  }, [
    eventObj.startTime,
    eventObj.total_event_time,
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
      id={eventObj.sc_app__id}
      className={
        'ib-event-wrapper ib-event-wrapper-week ' +
        (isDraging ? 'dragging' : '')
      }
      ref={eventRef}
      onMouseDown={e => handleDragStart(e, event)}
      style={{
        width: eventObj.width + '%',
        left: eventObj.left + '%',
        top: marginTop + 'px',
        resize: 'both',
        cursor: 'move',
        opacity: 1,
        height: eventHeight + 'px',
      }}
    >
      <div className="ib-event-box ib-event-box-week" style={eventStyleWrap}>
        {overLap && !overLap.top && (
          <div
            className="dragging-handler-week top"
            onMouseDown={e => {
              handleMouseDownResize(e, 'top');
            }}
          ></div>
        )}
        <EventBoxView event={event} eventHeight={eventHeight} />
        {overLap && !overLap.bottom && (
          <div
            className="dragging-handler-week bottom"
            onMouseDown={e => {
              handleMouseDownResize(e, 'bottom');
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export const EventBoxView = (eventObj, eventHeight) => {
  return (
    <div
      className="ib-event-box ib-event-box-week"
      style={{ height: eventHeight + 'px' }}
    >
      <div className="ib-event ib-event-week">----{eventObj.title}---</div>
    </div>
  );
};

export default EventBox;
