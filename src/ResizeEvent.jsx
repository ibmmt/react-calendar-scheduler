import { useEffect, useRef, useState } from 'react';

const EventResizeBox = ({
  title,
  event,
  side,
  top,
  color,
  boxHeight,
  boxTime,
  lastCleintY,
  heightOfWeekColumn,
  updateEvent,
}) => {
  const [marginTop, setMarginTop] = useState(top);
  const [eventHeight, setEventHeight] = useState(0);
  const lastCleintYRef = useRef(lastCleintY);
  const [isResizing, setIsResizing] = useState(true);

  const setHeightAndTop = (diff, side) => {
    if (side === 'top') {
      setMarginTop(marginTop + diff);
      setEventHeight(eventHeight - diff);
    }
    if (side === 'bottom') {
      setEventHeight(eventHeight + diff);
      //eventHeight= eventHeight + (lastClientBottom - e.clientY);
    }
  };
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
  const mouseUp = e => {
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

    // startTime,
    //   endTime,
    // startDate: '04/04/2023',
    //   endDate: '04/04/2023',
    //   startTime: '01:30:00',
    //   endTime: '03:00:00',
    updateEvent(event);
  };

  return (
    <div
      className="resize-event-bg"
      onMouseUp={mouseUp}
      onMouseMove={e => {
        if (!isResizing) return;
        const diff = e.clientY - lastCleintYRef.current;
        setHeightAndTop(diff, side);
        lastCleintYRef.current = e.clientY;
      }}
    >
      <div
        className="ib-event-wrapper ib-event-wrapper-week"
        style={{
          width: 100 + '%',
          left: 0,
          top: marginTop + 'px',
          resize: 'both',
          backgroundColor: color,
          zIndex: 1000,
          height: eventHeight + 'px',
        }}
      >
        <div className="ib-event-box ib-event-box-week" style={eventStyleWrap}>
          <div className="ib-event ib-event-week">{title}</div>
          <div
            className="dragging-handler-week top"
            // onMouseDown={e => {
            //   handleMouseDown(e, 'top');
            //   setSide('top');
            // }}
          ></div>
          <div
            className="dragging-handler-week bottom"
            // onMouseDown={e => {
            //   handleMouseDown(e, 'bottom');
            //   setSide('bottom');
            // }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventResizeBox;
