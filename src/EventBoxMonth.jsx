import { useContext, useEffect, useRef, useState } from 'react';

import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import { EventBoxView } from './EventView';

const EventBoxMonth = ({
  boxHeight,
  boxTime,
  eventObj,
  boxDay,

  isCalander,
  isDraging,
  isResizing,
}) => {
  const [offset, setOffset] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ start: false, end: false });
  const newEventTime = useRef({ start: 0, end: 0 });
  const {
    dragStart,
    dragEnd,
    resizeStart,
    resizeEnd,
    calanderToAddOrUpdateEvent,
  } = useContext(EventHandlerContex);
  const eventRef = useRef();

  /**
   * Handle mouse Down on the event box, to start drag
   * @param {}
   */

  const handleDragStart = () => {
    if (isResizing) {
      dragEnd();
    } else {
      dragStart(eventObj, boxDay);
    }
  };

  /**
   * handle mouse Down on Resize bar
   * @param {Event} e
   * @param {String} side
   */
  const handleMouseDownResize = (e, side) => {
    e.stopPropagation();
    e.preventDefault();
    resizeStart(eventObj, boxDay, side);
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

  /*
   * handle mouse up on the event box, to stop drag
   * @param {Event} e
   * */
  const handleMouseUpResize = e => {
    if (!isResizing) return;
    e.preventDefault();
    resizeEnd();
  };
  const handleMouseUpDrag = e => {
    e.preventDefault();
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
    opacity: isDraging || isResizing ? 0.9 : 1,
    zIndex: isDraging || isResizing ? 10000 : 1,
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
  } else {
    eventStyle.width = eventObj.width + '%';
    eventStyle.left = eventObj.left + '%';
    eventStyle.top = offset + 'px';
    eventStyle.height = eventHeight + 'px';
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
            calanderToAddOrUpdateEvent(eventObj);
          }}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseUp={handleMouseUpDrag}
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
