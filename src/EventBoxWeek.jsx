import { useContext, useEffect, useRef, useState } from 'react';
import { EventHandlerContex } from './CalendarWeek';
import { HOUR_MILLISECONDS } from './Constant';
//let timeout = undefined;
const EventBoxWeek = ({
  boxHeight,
  boxTime,
  eventObj,
  isPlaceholder,
  boxDay,
  calanderToAddOrUpdateEvent,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ top: false, bottom: false });
  const newEventTime = useRef({ start: 0, end: 0 });
  const { updateEvent, dragStart, dragEnd } = useContext(EventHandlerContex);
  const eventRef = useRef();
  const lastCleintYRef = useRef(0);
  const sideRef = useRef('');
  //const [clickCount, setClickCount] = useState(0);

  /**
   * Handle mouse Down on the event box, to start drag
   * @param {}
   */

  const handleDragStart = () => {
    if (isResizing) {
      dragEnd();
      setIsDraging(false);
    } else {
      setIsDraging(true);
      dragStart(eventObj, boxDay);
    }
  };

  // useEffect(() => {
  //   if (!clickCount) return;
  //   if (timeout) clearTimeout(timeout);
  //   console.log('clickCount', clickCount);
  //   timeout = setTimeout(() => {
  //     if (clickCount === 1) {
  //       handleDragStart();
  //     }
  //     if (clickCount === 2) {
  //       calanderToAddOrUpdateEvent(eventObj);
  //     }

  //     setClickCount(0);
  //   }, 500);
  //   return () => clearTimeout(timeout);
  // }, [clickCount]);

  /**
   * handle mouse Down on Resize bar
   * @param {Event} e
   * @param {String} side
   */
  const handleMouseDownResize = (e, side) => {
    e.stopPropagation();
    e.preventDefault();
    newEventTime.current.start = eventObj.startTime;
    newEventTime.current.end = eventObj.endTime;
    lastCleintYRef.current = 0;
    sideRef.current = side;
    setIsResizing(true);
  };

  /**
   * Handle mouse move on the event box, to drag
   * @param {number} startTime
   * @param {number} endTime
   */
  const setPostionAndHeight = (startTime, endTime) => {
    const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
    const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);
    newEventTime.current.start = startTime;
    newEventTime.current.end = endTime;

    /*
     * check if the event is over lapping with the box
     */
    if (startTime < boxDayTimeStart) {
      startTime = boxDayTimeStart;
      setOverLap({ ...overLap, top: true });
    } else {
      setOverLap({ ...overLap, top: false });
    }
    if (endTime > boxDayTimeEnd) {
      endTime = boxDayTimeEnd;
      setOverLap({ ...overLap, bottom: true });
    } else {
      setOverLap({ ...overLap, bottom: false });
    }
    const total_event_time = (endTime - startTime) / HOUR_MILLISECONDS;
    const height = (boxHeight / boxTime) * total_event_time;
    setEventHeight(height);
    let hours_difference_from_start =
      (startTime - boxDayTimeStart) / HOUR_MILLISECONDS;
    let event_top = hours_difference_from_start * (boxHeight / boxTime);
    setMarginTop(event_top);
  };

  /*
   * resize event boc on mouse move
   * @param {number} diff
   * @param {String} side
   */
  const resizeEventFun = (diff, side) => {
    if (side === 'top') {
      eventObj.startTime =
        eventObj.startTime + (diff / boxHeight) * boxTime * HOUR_MILLISECONDS;
      setPostionAndHeight(eventObj.startTime, eventObj.endTime);
    }
    if (side === 'bottom') {
      eventObj.endTime =
        eventObj.endTime + (diff / boxHeight) * boxTime * HOUR_MILLISECONDS;
      setPostionAndHeight(eventObj.startTime, eventObj.endTime);
    }
  };

  /*
   * handle mouse move on the event box, to drag
   * @param {Event} e
   * */
  const handleMouseMove = e => {
    if (!isResizing) return;
    if (lastCleintYRef.current == 0) {
      lastCleintYRef.current = e.clientY;
      return;
    }
    const diff = e.clientY - lastCleintYRef.current;
    if (diff > 10 || diff < -10) {
      resizeEventFun(diff, sideRef.current);
      lastCleintYRef.current = e.clientY;
    }
  };

  /*
   * handle mouse up on the event box, to stop drag
   * @param {Event} e
   * */
  const handleMouseUpResize = e => {
    setIsResizing(false);
    console.log('mouser up reisze', eventObj);
    if (!isResizing) return;
    e.preventDefault();
    lastCleintYRef.current = 0;
    updateEvent({
      ...eventObj,
      startTime: newEventTime.current.start,
      endTime: newEventTime.current.end,
    });
  };
  const handleMouseUpDrag = e => {
    e.preventDefault();
    setIsDraging(false);
    dragEnd();
  };

  /*
   * use effect to add mouse move and mouse up event listener
   * */

  useEffect(() => {
    if (!isResizing) return;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUpResize);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpResize);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!isDraging) return;
    console.log('mouser up reidrag');
    document.addEventListener('mouseup', handleMouseUpDrag);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpDrag);
    };
  }, [isDraging]);

  /*
   * use effect to set the event position and height
   * */
  useEffect(() => {
    if (!eventObj) return;
    setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  }, [eventObj]);

  return (
    <>
      {eventObj && (
        <div
          id={eventObj.sc_app__id}
          className={
            'ib__sc__event-wrapper ib__sc__event-wrapper-week ' +
            (isDraging ? 'dragging' : '')
          }
          ref={eventRef}
          onMouseDown={handleDragStart}
          onDoubleClick={e => {
            e.stopPropagation();
            e.preventDefault();
            dragEnd();
            // handleAddEvent(eventObj);
            calanderToAddOrUpdateEvent(eventObj);
          }}
          onMouseUp={handleMouseUpDrag}
          // onClick={e => {
          //   e.stopPropagation();
          //   e.preventDefault();
          //   alert('double click');
          //   handleAddEvent(eventObj);
          // }}
          style={{
            width: eventObj.width + '%',
            left: eventObj.left + '%',
            top: marginTop + 'px',
            resize: 'both',
            cursor: 'move',
            opacity: isDraging ? 0.4 : 1,
            zIndex: isPlaceholder || isResizing ? 10000 : 1,
            height: eventHeight + 'px',
          }}
        >
          <div
            className="ib__sc__event-box ib__sc__event-box-week"
            style={{
              height: eventHeight + 'px',
              backgroundColor: eventObj.bg_color,
            }}
          >
            {overLap && !overLap.top && (
              <div
                style={isResizing ? { display: 'block' } : {}}
                className="dragging-handler-week top"
                onMouseDown={e => {
                  handleMouseDownResize(e, 'top');
                }}
              >
                =
              </div>
            )}
            <EventBoxView eventObj={eventObj} eventHeight={eventHeight} />
            {overLap && !overLap.bottom && (
              <div
                style={isResizing ? { display: 'block' } : {}}
                className="dragging-handler-week bottom"
                onMouseDown={e => {
                  handleMouseDownResize(e, 'bottom');
                }}
              >
                =
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const EventBoxView = ({ eventObj, eventHeight }) => {
  return (
    <div
      className="ib__sc__event-box ib__sc__event-box-week"
      style={{ height: eventHeight + 'px' }}
    >
      <div className="ib__sc__event ib__sc__event-week">{eventObj.title}</div>
    </div>
  );
};

export default EventBoxWeek;
