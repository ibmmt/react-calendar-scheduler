import { useEffect, useRef, useState } from 'react';

const EventResizeBox = ({
  event,
  side,

  color,
  boxHeight,
  boxTime,

  heightOfWeekColumn,
  updateEvent,
}) => {
  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const lastCleintYRef = useRef(0);
  const [isResizing, setIsResizing] = useState(true);

  const eventStyleWrap = {
    height: eventHeight,
  };
  const setPostionAndHeight = () => {
    const startTimeObj = new Date(event.startTime);
    const daystartTime = new Date(startTimeObj).setHours(0, 0, 0, 0);

    const height = (boxHeight / boxTime) * event.total_event_time;
    setEventHeight(height);
    let hours_difference_from_start =
      (Date.parse(startTimeObj) - Date.parse(new Date(daystartTime))) / 3600000;
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
  }, []);

  const handleMouseUp = e => {
    if (!isResizing) return;
    e.preventDefault();
    setIsResizing(false);
    let newEvent = event;
    //--find updated start Date dd/mm/yyyy
    const startTimeObj = new Date(event.startTime);
    const daystartTime = new Date(startTimeObj).setHours(0, 0, 0, 0);
    if (side === 'top') {
      let hrFromStart = marginTop / (boxHeight / boxTime);
      const newStartDate = new Date(
        daystartTime + hrFromStart * 60 * 60 * 1000,
      );
      newEvent.startTime = newStartDate;
    }

    if (side === 'bottom') {
      let hrFromStart = (marginTop + eventHeight) / (boxHeight / boxTime);
      const newEndDate = new Date(daystartTime + hrFromStart * 60 * 60 * 1000);
      newEvent.endTime = newEndDate;
    }

    newEvent.total_event_time = eventHeight / (boxHeight / boxTime);

    updateEvent(event);
  };

  const resizeEventFun = (diff, side) => {
    console.log('setHeightAndTop', diff, side);
    if (side === 'top') {
      setMarginTop(marginTop + diff);
      setEventHeight(eventHeight - diff);
    }
    if (side === 'bottom') {
      setEventHeight(eventHeight + diff);
    }
  };

  const handleMouseMove = e => {
    console.log('handleMouseMove');
    if (!isResizing) return;
    console.log(
      'moooooooooooooooooooooooooooooooove',
      e.clientY,
      lastCleintYRef.current,
    );
    if (lastCleintYRef.current !== 0) {
      const diff = e.clientY - lastCleintYRef.current;
      console.log('diff', diff, side);
      resizeEventFun(diff, side);
    }

    lastCleintYRef.current = e.clientY;
  };

  return (
    <div
      className="resize-event-bg"
      onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="ib__sc__event-wrapper ib__sc__event-wrapper-week"
        style={{
          width: 100 + '%',
          left: 0,
          top: marginTop + 'px',
          // resize: 'both',
          backgroundColor: color,
          zIndex: 1000,
          height: eventHeight + 'px',
        }}
        // onMouseMove={handleMouseMove}
      >
        <div
          className="ib__sc__event-box ib__sc__event-box-week"
          style={eventStyleWrap}
          onClick={() => {
            alert('clicked');
          }}
          //onMouseMove={handleMouseMove}
        >
          <div className="ib__sc__event ib__sc__event-week">{event.title}</div>
          <div className="dragging-handler-week top"></div>
          <div className="dragging-handler-week bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default EventResizeBox;
