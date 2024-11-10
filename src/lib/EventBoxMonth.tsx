import React, { useContext, useEffect, useRef, useState } from 'react';

import { EventHandlerContex } from './Contex';
import { EventBoxView } from './EventView';
import { EventObject } from './type/EventObject';

interface EventBoxMonthProps {
  boxHeight: number;
  eventHeight: number;

  eventObj: EventObject;
  boxDay: number;

  isDraging: boolean;
  isResizing: boolean;
  isDragable: boolean;
}

const EventBoxMonth: React.FC<EventBoxMonthProps> = ({
  boxHeight,
  eventHeight,

  eventObj,
  boxDay,

  isDraging,
  isResizing,
  isDragable,
}) => {
 // const [offset, setOffset] = useState(0);
 // const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ start: false, end: false });
  //const newEventTime = useRef({ start: 0, end: 0 });
  const mouseDownRef = useRef(false);
  const {
    dragStart,
    dragEnd,
    resizeStart,
    resizeEnd,
    calendarToAddOrUpdateEvent,
  } = useContext(EventHandlerContex);
  const eventRef = useRef<HTMLDivElement>(null);

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
  const handleMouseDownResize = (e: React.MouseEvent, side: string) => {
    e.stopPropagation();
    e.preventDefault();
    resizeStart(eventObj, boxDay, side);
  };

  /**
   * Handle mouse move on the event box, to drag
   * @param {number} startTime
   * @param {number} endTime
   */
  const setPostionAndHeight = (_startTime?: number, _endTime?: number) => {
    if(!_startTime || !_endTime) {
      return
    }
    const startTime = new Date(_startTime).setHours(0, 0, 0, 0);
    const endTime = new Date(_endTime).setHours(23, 59, 59, 999);
    const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
    const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);
   
    if (startTime < boxDayTimeStart) {
     
      overLap.start = true;
    } else {
      overLap.start = false;
    }
    if (endTime > boxDayTimeEnd) {
      
      overLap.end = true;
    } else {
      overLap.end = false;
    }

    setOverLap({ ...overLap });
  
  };

  /*
   * handle mouse up on the event box, to stop drag
   * @param {Event} e
   * */
  const handleMouseUpResize = (e: MouseEvent) => {
    if(!isDragable)return;
    if (!isResizing) return;
    e.preventDefault();
    resizeEnd();
  };
  const handleMouseUpDrag = (e: MouseEvent) => {
    e.preventDefault();
    dragEnd();
  };

  useEffect(() => {
    if (!isDraging) return;
    document.addEventListener('mouseup', handleMouseUpDrag);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpDrag);
    };
  }, [isDraging]);

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
  }, [
    eventObj,
    eventObj.startTime,
    eventObj.endTime,
    boxHeight,
    boxDay,
  ]);



  const eventStyle: React.CSSProperties = {
    cursor: 'move',
    opacity: isDraging || isResizing ? 0.9 : 1,
    zIndex: isDraging || isResizing ? 10000 : 1,
   // height: eventHeight + 'px',
  };
  const eventBoxStyle: React.CSSProperties = {
    backgroundColor: eventObj.bg_color,
  };
  
    eventStyle.width = '100%';
    eventStyle.left = '0%';
    eventStyle.top = (eventObj.noOfOverLeftLap || 0)*eventHeight +'px';
    eventStyle.height = eventHeight + 'px';
   
 
  return (
    <>
      {eventObj && (
        <div
          id={eventObj.sc_app__id+''}
          className={
            'ib__sc__event-wrapper ib__sc__event-wrapper-month ' + (eventObj.custom_class || ' ') +
            (isDraging ? ' dragging' : '') +
            ' ' +
            (overLap.start ? 'overlap-start' : '') +
            ' ' +
            (overLap.end ? 'overlap-end' : '')
          }
          ref={eventRef}
          onMouseDown={e => {
            e.preventDefault();
            mouseDownRef.current = true;
            handleDragStart();
          }}
          onMouseUp={e => {
            e.preventDefault();
            mouseDownRef.current = false;
          }}
          
        
          
          onClick={e => {
            if (isResizing) return;

            e.stopPropagation();
            e.preventDefault();

            dragEnd();
            calendarToAddOrUpdateEvent(eventObj);
          }}
          
          style={eventStyle}
        >
          
        
          <div
            className="ib__sc__event-box ib__sc__event-box-month"
            style={eventBoxStyle}
          >
            {overLap && !overLap.start && eventObj.isResizable&& (
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
             // eventHeight={eventHeight}
            ///  overLap={overLap}
             // isCalender={isCalender}
              isShowTitle={!overLap.start}
              isStart={!overLap.start}
            />

            {overLap && !overLap.end && eventObj.isResizable&& (
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
