import { useContext, useEffect, useRef, useState } from 'react';

import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import { EventBoxView } from './EventView';
//let timeout = undefined;
const EventBoxMonth = ({
  boxHeight,
  boxTime,
  eventObj,
  isPlaceholder,
  boxDay,
  calanderToAddOrUpdateEvent,
  isCalander,
  isDraging,
  isResizing,
}) => {
  // const [isDraging, setIsDraging] = useState(false);
  // const [isResizing, setIsResizing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ start: false, end: false });
  const newEventTime = useRef({ start: 0, end: 0 });
  const { dragStart, dragEnd, resizeStart, resizeEnd } =
    useContext(EventHandlerContex);
  const eventRef = useRef();

  //const [clickCount, setClickCount] = useState(0);

  /**
   * Handle mouse Down on the event box, to start drag
   * @param {}
   */

  const handleDragStart = () => {
    console.log('handleDragStart');
    if (isResizing) {
      dragEnd();
      //setIsDraging(false);
    } else {
      //  setIsDraging(true);
      dragStart(eventObj, boxDay);
    }
  };

  /**
   * handle mouse Down on Resize bar
   * @param {Event} e
   * @param {String} side
   */
  const handleMouseDownResize = (e, side) => {
    console.log('handleMouseDownResize');
    e.stopPropagation();
    e.preventDefault();
    // newEventTime.current.start = eventObj.startTime;
    // newEventTime.current.end = eventObj.endTime;
    // lastCleintYRef.current = 0;
    // sideRef.current = side;
    resizeStart(eventObj, boxDay, side);
    // setIsResizing(true);
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
      overLap.start = true;
    } else {
      overLap.start = false;
    }
    if (endTime > boxDayTimeEnd) {
      endTime = boxDayTimeEnd;
      overLap.end = true;
    } else {
      overLap.end = false;
    }

    setOverLap({ ...overLap });
    const total_event_time = (endTime - startTime) / HOUR_MILLISECONDS;
    const height = (boxHeight / boxTime) * total_event_time;
    setEventHeight(height);
    let hours_difference_from_start =
      (startTime - boxDayTimeStart) / HOUR_MILLISECONDS;
    let event_top = hours_difference_from_start * (boxHeight / boxTime);
    setOffset(event_top);
  };

  // /*
  //  * resize event boc on mouse move
  //  * @param {number} diff
  //  * @param {String} side
  //  */
  // const resizeEventFun = (diff, side) => {
  //   if (side === 'top') {
  //     eventObj.startTime =
  //       eventObj.startTime + (diff / boxHeight) * boxTime * HOUR_MILLISECONDS;
  //     setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  //   }
  //   if (side === 'bottom') {
  //     eventObj.endTime =
  //       eventObj.endTime + (diff / boxHeight) * boxTime * HOUR_MILLISECONDS;
  //     setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  //   }
  // };

  // /*
  //  * handle mouse move on the event box, to drag
  //  * @param {Event} e
  //  * */
  // const handleMouseMove = e => {
  //   console.log('handleMouseMove');
  //   if (!isResizing) return;
  //   console.log('handleMouseMove');
  //   if (lastCleintYRef.current == 0) {
  //     lastCleintYRef.current = e.clientY;
  //     return;
  //   }
  //   const diff = e.clientY - lastCleintYRef.current;
  //   if (diff > 10 || diff < -10) {
  //     resizeEventFun(diff, sideRef.current);
  //     lastCleintYRef.current = e.clientY;
  //   }
  // };

  /*
   * handle mouse up on the event box, to stop drag
   * @param {Event} e
   * */
  const handleMouseUpResize = e => {
    //  setIsResizing(false);
    console.log('mouser up reisze', eventObj);
    if (!isResizing) return;
    e.preventDefault();
    resizeEnd();
  };
  const handleMouseUpDrag = e => {
    console.log('mouser up drag');
    e.preventDefault();
    //setIsDraging(false);
    dragEnd();
  };

  /*
   * use effect to add mouse move and mouse up event listener
   * */

  useEffect(() => {
    if (!isResizing) return;

    document.addEventListener('mouseup', handleMouseUpResize);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpResize);
    };
  }, [isResizing]);

  // useEffect(() => {
  //   if (!isDraging) return;
  //   console.log('mouser up reidrag');
  //   document.addEventListener('mouseup', handleMouseUpDrag);
  //   return () => {
  //     document.removeEventListener('mouseup', handleMouseUpDrag);
  //   };
  // }, [isDraging]);

  /*
   * use effect to set the event position and height
   * */
  useEffect(() => {
    if (!eventObj) return;
    setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  }, [eventObj, eventObj.startTime, eventObj.endTime]);

  const eventStyle = {
    width: eventObj.width + '%',
    left: eventObj.left + '%',
    top: offset + 'px',
    // resize: 'both',
    cursor: 'move',
    //opacity: isDraging ? 0.4 : 1,
    zIndex: isPlaceholder || isResizing ? 10000 : 1,
    height: eventHeight + 'px',
  };
  const eventBoxStyle = {
    backgroundColor: eventObj.bg_color,
  };
  if (isCalander) {
    eventStyle.width = '100%';
    eventStyle.left = '0%';
    eventStyle.top = eventObj.left + '%';
    eventStyle.height = eventObj.width + '%';
    // if (overLap && overLap.start) {
    //   eventBoxStyle.borderTopLeftRadius = '0px';
    //   eventBoxStyle.borderBottomLeftRadius = '0px';
    // }
    // if (isCalander && overLap && overLap.end) {
    //   eventBoxStyle.borderTopRightRadius = '0px';
    //   eventBoxStyle.borderBottomRightRadius = '0px';
    // }
  } else {
    eventStyle.width = eventObj.width + '%';
    eventStyle.left = eventObj.left + '%';
    eventStyle.top = offset + 'px';
    eventStyle.height = eventHeight + 'px';

    // if (overLap && overLap.start) {
    //   eventBoxStyle.borderTopLeftRadius = '0px';
    //   eventBoxStyle.borderTopRightRadius = '0px';
    // }
    // if (overLap && overLap.end) {
    //   eventBoxStyle.borderBottomLeftRadius = '0px';
    //   eventBoxStyle.borderBottomRightRadius = '0px';
    // }
  }

  return (
    <>
      {eventObj && (
        <div
          id={eventObj.sc_app__id}
          className={
            'ib__sc__event-wrapper ib__sc__event-wrapper-month ' +
            (isDraging ? 'dragging' : '') +
            ' ' +
            (overLap.start ? 'overlap-start' : '') +
            ' ' +
            (overLap.end ? 'overlap-end' : '')
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
          style={eventStyle}
        >
          <div
            className="ib__sc__event-box ib__sc__event-box-week"
            style={eventBoxStyle}
          >
            {overLap && !overLap.start && (
              <div
                style={isResizing ? { display: 'flex' } : {}}
                className="dragging-handler-month left"
                onMouseDown={e => {
                  handleMouseDownResize(e, 'left');
                }}
              >
                ||
              </div>
            )}

            <EventBoxView
              eventObj={eventObj}
              eventHeight={eventHeight}
              overLap={overLap}
              isCalander={isCalander}
              isShowTitle={!overLap.start}
            />
            {overLap && !overLap.end && (
              <div
                style={isResizing ? { display: 'flex' } : {}}
                className="dragging-handler-month right"
                onMouseDown={e => {
                  handleMouseDownResize(e, 'right');
                }}
              >
                ||
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventBoxMonth;
