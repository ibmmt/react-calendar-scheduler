import { useContext, useEffect, useRef, useState } from 'react';
import { EventHandlerContex } from './Calender';

const EventBox = ({
  boxHeight,
  boxTime,
  heightOfWeekColumn,
  event,
  onStartResize,
}) => {
  //const lastPostion = useRef(0);
  const [isResizing, setIsResizing] = useState(false);
  const [isDraging, setIsDraging] = useState(false);
  const eventRef = useRef();
  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);
  const [dragStart] = useContext(EventHandlerContex);

  const handleMouseDown = (e, side) => {
    console.log('handleMouseDown', e);
    if (!e) {
      return;
    }
    e.preventDefault();

    setIsResizing(true);
    onStartResize(event, side);
    //lastPostion.current = e.clientY;
  };

  const handleMouseUp = e => {
    if (!isResizing) return;
    console.log('handleMouseUp', e);
    setIsResizing(false);
    // setHeightAndTop(e.clientY - lastPostion.current, side);
    //  document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleDragStart = e => {
    console.log('handleDragStarstart start', e);
    document.body.style.cursor = 'none';
    // setIsDraging(true);
    console.log(event);
    // e.dataTransfer.setData('text/plain', event.sc_app__id);
    dragStart(event);
  };
  const handleDragEnd = e => {
    console.log('handleDrag end end ', e);
    setIsDraging(false);
    document.body.style.cursor = 'auto';
    //dragStart(null);
    e.dataTransfer.setData('text/plain', event.sc_app__id);
  };

  // const mouseDrag = e => {
  //   console.log('mouseDrag', e.clientX, e.clientY);
  // };

  // useEffect(() => {
  //   if (isDraging) {
  //     console.log('11111111111111111111111');
  //     document.addEventListener('mousemove', mouseDrag);
  //   } else {
  //     console.log('222222222222222222222222222');
  //     document.removeEventListener('mousemove', mouseDrag);
  //   }
  //   return () => {
  //     document.removeEventListener('mousemove', mouseDrag);
  //   };
  // }, [isDraging]);
  // const dragOverHandler = e => {
  //   e.preventDefault();
  //   e.dataTransfer.dropEffect = 'move';
  //   console.log('dragOverHandler', e.clientX, e.clientY);
  // };
  // const dropHandler = e => {
  //   e.preventDefault();
  //   console.log('dropHandler', e.clientX, e.clientY);
  // };

  // useEffect(() => {
  //   document.addEventListener('dragover', dragOverHandler);
  //   document.addEventListener('drop', dropHandler);
  //   return () => {
  //     document.removeEventListener('dragover', dragOverHandler);
  //     document.removeEventListener('drop', dropHandler);
  //   };
  // });

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
  }, [
    event.startTime,
    event.total_event_time,
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
      id={event.sc_app__id}
      className={
        'ib-event-wrapper ib-event-wrapper-week ' +
        (isDraging ? 'dragging' : '')
      }
      ref={eventRef}
      draggable="true"
      onDragStart={e => handleDragStart(e, event)}
      onDragEnd={handleDragEnd}
      style={{
        width: event.width + '%',
        left: event.left + '%',
        top: marginTop + 'px',
        resize: 'both',
        cursor: 'move',
        opacity: isDraging ? 0.5 : 1,
        height: eventHeight + 'px',
      }}
      onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
    >
      <div className="ib-event-box ib-event-box-week" style={eventStyleWrap}>
        <div className="ib-event ib-event-week">{event.title}</div>
        <div
          className="dragging-handler-week top"
          onMouseDown={e => {
            handleMouseDown(e, 'top');
          }}
        ></div>
        <div
          className="dragging-handler-week bottom"
          onMouseDown={e => {
            handleMouseDown(e, 'bottom');
          }}
        ></div>
      </div>
    </div>
  );
};

export default EventBox;
