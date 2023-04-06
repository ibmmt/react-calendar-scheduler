import { useEffect, useRef, useState } from 'react';

const DragingEvent = ({
  event,

  color,
  boxHeight,
  boxTime,

  heightOfWeekColumn,
  updateEvent,
}) => {
  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const lastCleintYRef = useRef(0);
  const [isDraging, setIsDraging] = useState(true);

  const eventStyleWrap = {
    height: eventHeight,
  };
  const setPostionAndHeight = () => {
    const startTimeObj = new Date(event.startTime);
    const daystartTime = new Date(startTimeObj).setHours(0, 0, 0, 0);

    const height = (boxHeight / boxTime) * event.total_event_time;

    setEventHeight(height);
    const hours_difference_from_start =
      (Date.parse(startTimeObj) - Date.parse(new Date(daystartTime))) / 3600000;
    let event_top = hours_difference_from_start * (boxHeight / boxTime);

    console.log('margin', event_top);
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
    if (!isDraging) return;
    e.preventDefault();
    setIsDraging(false);
    let newEvent = event;

    newEvent.total_event_time = eventHeight / (boxHeight / boxTime);

    updateEvent(event);
  };

  const resizeEventFun = diff => {
    setMarginTop(marginTop + diff);
  };

  const handleMouseMove = e => {
    console.log('handleMouseMove');
    if (!isDraging) return;

    if (lastCleintYRef.current !== 0) {
      const diff = e.clientY - lastCleintYRef.current;
      resizeEventFun(diff);
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
        className="ib-event-wrapper ib-event-wrapper-week"
        style={{
          // width: 100 + '%',
          width: '100px',
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
          className="ib-event-box ib-event-box-week"
          style={eventStyleWrap}
          onClick={() => {
            alert('clicked');
          }}
          //onMouseMove={handleMouseMove}
        >
          <div className="ib-event ib-event-week">{event.title}</div>
          <div className="dragging-handler-week top"></div>
          <div className="dragging-handler-week bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default DragingEvent;
