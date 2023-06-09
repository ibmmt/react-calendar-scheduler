import React, { useEffect, useRef, useState } from 'react';
import EventBoxWeek from './EventBoxWeek';
import { isSameDay } from './_utils';
const DayColumnWeek = ({
  events,
  boxHeight,
  boxDay,
  updateEvent,
  calanderTableRef,
  dragBoxMouseEnterToCell,
  calanderToAddOrUpdateEvent,
  dragingEventId,
}) => {
  const BoxRef = useRef();
  /**
   * Handle event while eneter in box
   * @param {Event} e
   */
  const dragMouseEnter = e => {
    e.preventDefault();
    dragBoxMouseEnterToCell(boxDay);
  };

  /**
   * Handle click on hour box
   * @param {*} e
   * @param {Number} hour
   */
  const handleClickHourBox = (e, hour) => {
    e.preventDefault();
    e.stopPropagation();

    calanderToAddOrUpdateEvent({
      startTime: new Date(boxDay).setHours(hour, 0, 0, 0),
      endTime: new Date(boxDay).setHours(hour + 1, 0, 0, 0),
    });
  };

  /**
   * Add event listener on mouse enter
   */
  useEffect(() => {
    if (!BoxRef.current) return;
    if (!dragingEventId) return;
    BoxRef.current.addEventListener('mouseenter', dragMouseEnter, true);
    return () => {
      BoxRef.current.removeEventListener('mouseenter', dragMouseEnter, true);
    };
  }, [dragingEventId]);

  return (
    <>
      <div ref={BoxRef} className="ib__sc__cell ib__sc__cell-week">
        <div className="ib__sc__cell-wrapper ib__sc__cell-wrapper-week">
          {!!events &&
            !!events.length &&
            events.map(eventObj => (
              <EventBoxWeek
                key={eventObj.sc_app__id}
                eventObj={eventObj}
                boxDay={boxDay}
                calanderTableRef={calanderTableRef}
                boxHeight={boxHeight}
                dragingEventId={dragingEventId}
                updateEvent={updateEvent}
                calanderToAddOrUpdateEvent={calanderToAddOrUpdateEvent}
              />
            ))}
          {isSameDay(boxDay, new Date()) && (
            <CurrentTimeBar boxHeight={boxHeight} />
          )}
          {/* This is hour boxes */}
          {[...Array(24).keys()].map((hour, index) => (
            <div
              key={index}
              onClick={e => handleClickHourBox(e, hour)}
              style={{ height: boxHeight + 'px', draggable: 'true' }}
              className="ib__sc__table-hr-box-week"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

/**
 * Render current time bar
 */
const CurrentTimeBar = ({ boxHeight }) => {
  const [top, setTop] = useState(0);

  /**
   * Calculate top position of current time bar
   * @returns {Number}
   */
  const calculateTopCurrentTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();
    const toalHours = currentHour + currentMin / 60;
    const top = toalHours * boxHeight;
    setTop(top);
  };
  /**
   * Calculate top position of current time bar
   */
  useEffect(() => {
    calculateTopCurrentTime();
    const interval = setInterval(() => {
      setTop(calculateTopCurrentTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ top: top + 'px' }} className="ib__sc__daybar-week"></div>
  );
};

export default DayColumnWeek;
