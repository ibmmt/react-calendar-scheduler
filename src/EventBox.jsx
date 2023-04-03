import { useEffect, useState } from 'react';

const EventBox = ({
  boxHeight,
  boxTime,
  heightOfWeekColumn,

  event,
  onStartResize,
}) => {
  //const lastPostion = useRef(0);
  const [isResizing, setIsResizing] = useState(false);

  const [marginTop, setMarginTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);

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
  // const setHeightAndTop = (diff, side) => {
  //   if (side === 'top') {
  //     setMarginTop(marginTop + diff);
  //     setEventHeight(eventHeight - diff);
  //   }
  //   if (side === 'bottom') {
  //     setEventHeight(eventHeight + diff);
  //     //eventHeight= eventHeight + (lastClientBottom - e.clientY);
  //   }
  // };

  // const handleMouseMove = e => {
  //   if (!isResizing) return;

  //   console.log('isResizing', isResizing);

  //   console.log('handleMouseMove');
  //   console.log('eventHeight', eventHeight);
  //   console.log('e.clientY', e.clientY);
  //   console.log(' lastPostion.current', lastPostion.current);
  //   console.log('marginTop', marginTop);

  //   console.log('e.clientY - lastClinetTop', e.clientY - lastPostion.current);
  //   if (!eventRef) return;
  //   lastPostion.current = e.clientY;
  //   setHeightAndTop(e.clientY - lastPostion.current, side);
  // };
  // useEffect(() => {
  //   if (!isResizing) return;
  //   console.log('eventHeight', eventHeight);
  //   // document.addEventListener('mouseup', handleMouseUp);
  //   //document.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     document.removeEventListener('mouseup', () => {});
  //     document.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, [isResizing]);
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
      className="ib-event-wrapper ib-event-wrapper-week"
      style={{
        width: event.width + '%',
        left: event.left + '%',
        top: marginTop + 'px',
        resize: 'both',

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
