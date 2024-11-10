import React, { useContext, useEffect, useRef, useState } from 'react';
import { HOUR_MILLISECONDS } from './Constant';
import { EventHandlerContex } from './Contex';
import { EventBoxView } from './EventView';

interface EventBoxWeekProps {
  boxHeight: number;
  boxTime?: number;
  eventObj:any,
  boxDay: any;
  dragingEventId: any;
  eventWidth:number;
  minWidthOfCloumn:number;
}

const EventBoxWeek: React.FC<EventBoxWeekProps> = ({
  boxHeight,
  boxTime = 1,
  eventObj,
  boxDay,
  dragingEventId,
  eventWidth,
  minWidthOfCloumn,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [Offset, setOffset] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [overLap, setOverLap] = useState({ top: false, bottom: false });
  const newEventTime = useRef({ start: 0, end: 0 });
  const { updateEvent, dragStart, dragEnd, calendarToAddOrUpdateEvent } =
    useContext(EventHandlerContex);
  const eventRef = useRef<HTMLDivElement>(null);
  const lastCleintYRef = useRef(0);
  const sideRef = useRef('');
  const mouseDownRef = useRef(false);

  const handleDragStart = () => {
    if(eventObj.isDragable === false) return;

    setIsDraging(true);
    dragStart(eventObj, boxDay);
  };

  useEffect(() => {
    setTimeout(() => {
      if (dragingEventId === eventObj.sc_app__id) {
        setIsDraging(true);
      } else {
        setIsDraging(false);
      }
    }, 100);
  }, [dragingEventId]);

  const handleMouseDownResize = (e: React.MouseEvent, side: string) => {
    e.stopPropagation();
    e.preventDefault();
    newEventTime.current.start = eventObj.startTime;
    newEventTime.current.end = eventObj.endTime;
    lastCleintYRef.current = 0;
    sideRef.current = side;

    setIsResizing(true);
  };

  const handleMouseUpDrag = (e: MouseEvent) => {
    e.preventDefault();
    if (isDraging) {
      setTimeout(() => {
        setIsDraging(false);
      }, 100);
      dragEnd();
    }
  };

  const setPostionAndHeight = (startTime: number, endTime: number) => {
    const boxDayTimeStart = new Date(boxDay).setHours(0, 0, 0, 0);
    const boxDayTimeEnd = new Date(boxDay).setHours(23, 59, 59, 999);
    newEventTime.current.start = startTime;
    newEventTime.current.end = endTime;

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
    const hours_difference_from_start =
      (startTime - boxDayTimeStart) / HOUR_MILLISECONDS;

    const event_top =
      hours_difference_from_start * ((boxHeight / boxTime))
      //hours_difference_from_start * 1;
      
      
    setOffset(event_top);
  };

  const resizeEventFun = (diff: number, side: string) => {
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

  const handleMouseMoveResize = (e: MouseEvent) => {
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

  const handleMouseUpResize = (e: MouseEvent) => {
    if (!isResizing) return;
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      setIsResizing(false);
    }, 100);

    lastCleintYRef.current = 0;
    updateEvent({
      ...eventObj,
      startTime: newEventTime.current.start,
      endTime: newEventTime.current.end,
    });
  };

  useEffect(() => {
    if (!isResizing) return;
    document.addEventListener('mousemove', handleMouseMoveResize);
    document.addEventListener('mouseup', handleMouseUpResize);
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveResize);
      document.removeEventListener('mouseup', handleMouseUpResize);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!isDraging) return;
    document.addEventListener('mouseup', handleMouseUpDrag);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpDrag);
    };
  }, [isDraging]);

  useEffect(() => {
    if (!eventObj) return;
    setPostionAndHeight(eventObj.startTime, eventObj.endTime);
  }, [eventObj, boxHeight, boxTime, boxDay]);

 
//   const _eventWidth=  minWidthOfCloumn * eventObj.width / 100;
//   let _eventWidthString=eventObj.width + '%';
//   let _eventLeft = eventObj.left+'%';
//   if(_eventWidth < eventWidth){
//     _eventWidthString = eventWidth + 'px';
//    // _eventLeft = (eventObj.noOfOverLeftLap*eventWidth || 0)+'px';

//   }
// if(minWidthOfCloumn*  eventObj.left / 100 < eventObj.noOfOverLeftLap*eventWidth || 0){
//   _eventLeft = (eventObj.noOfOverLeftLap*eventWidth || 0)+'px';
// }
let _eventWidthString = eventWidth + 'px';
if(eventObj.width == 100){
  _eventWidthString = '100%';
}else{
  _eventWidthString = eventWidth + 'px';
}

  const eventStyle: React.CSSProperties = {
    width: (isDraging ? '100%' :  _eventWidthString),
    left: (isDraging ? '0px' : eventObj.noOfOverLeftLap*eventWidth + 'px'),
    top: Offset + 'px',
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
            'ib__sc__event-wrapper ib__sc__event-wrapper-week  ' + ( eventObj.custom_class || '') +
            (isDraging ? ' dragging' : '')
          }
          ref={eventRef}
          onMouseDown={e => {
            e.preventDefault();
            mouseDownRef.current = true;
          }}
          onMouseUp={e => {
            e.preventDefault();
            mouseDownRef.current = false;
          }}
          onMouseMove={() => {
            if (mouseDownRef.current && !isDraging) {
              handleDragStart();
            }
          }}
          onClick={e => {
            if (isResizing) return;
            if (isDraging) return;

            e.stopPropagation();
            e.preventDefault();

            dragEnd();
            calendarToAddOrUpdateEvent(eventObj);
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
            {overLap && !overLap.top && eventObj.isResizable && (
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
              //eventHeight={eventHeight}
          
              isShowTitle={true}
            />
           
            {overLap && !overLap.bottom && eventObj.isResizable && (
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
