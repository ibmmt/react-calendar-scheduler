import { useContext, useEffect, useRef, useState } from 'react';

import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import { EventBoxView } from './EventView';
//let timeout = undefined;
const EventBoxWeek = ({
  boxHeight,
  boxTime = 1,
  eventObj,
  boxDay,

  dragingEventId,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [Offset, setOffset] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ top: false, bottom: false });
  const newEventTime = useRef({ start: 0, end: 0 });
  const { updateEvent, dragStart, dragEnd, calanderToAddOrUpdateEvent } =
    useContext(EventHandlerContex);
  const eventRef = useRef();
  const lastCleintYRef = useRef(0);
  const sideRef = useRef('');
  //const [clickCount, setClickCount] = useState(0);

  /**
   * Handle mouse Down on the event box, to start drag
   * @param {}
   */

  const handleDragStart = () => {
    setIsDraging(true);
    dragStart(eventObj, boxDay);
  };

  useEffect(() => {
    if (dragingEventId === eventObj.sc_app__id) {
      setIsDraging(true);
    } else {
      setIsDraging(false);
    }
  }, [dragingEventId]);

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
    setOffset(event_top);
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
  const handleMouseMoveResize = e => {
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

    if (!isResizing) return;
    e.preventDefault();
    lastCleintYRef.current = 0;
    updateEvent({
      ...eventObj,
      startTime: newEventTime.current.start,
      endTime: newEventTime.current.end,
    });
  };

  /*
   * use effect to add mouse move and mouse up event listener
   * */

  useEffect(() => {
    if (!isResizing) return;
    document.addEventListener('mousemove', handleMouseMoveResize);
    document.addEventListener('mouseup', handleMouseUpResize);
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveResize);
      document.removeEventListener('mouseup', handleMouseUpResize);
    };
  }, [isResizing]);

  /*
   * use effect to set the event position and height
   * */
  useEffect(() => {
    if (!eventObj) return;
    setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  }, [eventObj]);

  const eventStyle = {
    width: (isDraging ? 100 : eventObj.width) + '%',
    left: (isDraging ? 0 : eventObj.left) + '%',
    top: Offset + 'px',
    // resize: 'both',
    cursor: 'move',
    opacity: isDraging ? 0.8 : 1,
    boxShadow: isDraging ? '0 0 10px 0 rgba(0,0,0,0.5)' : 'none',
    zIndex: isDraging || isResizing ? 10000 : 1,
    height: eventHeight + 'px',
  };

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
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          style={eventStyle}
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
            <EventBoxView
              eventObj={eventObj}
              eventHeight={eventHeight}
              isShowTitle={true}
            />
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

export default EventBoxWeek;
