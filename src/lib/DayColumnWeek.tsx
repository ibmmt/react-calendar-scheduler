import React, { useEffect, useRef, useState } from 'react';
import EventBoxWeek from './EventBoxWeek';
import { isSameDay } from './_utils';
import { EventObject } from './type/EventObject';

interface DayColumnWeekProps {
  events: EventObject[];
  boxHeight: number;
  boxDay: Date;
  updateEvent: (event: EventObject) => void;
  calenderTableRef: React.RefObject<any>;
  dragBoxMouseEnterToCell: (day: Date) => void;
  calenderToAddOrUpdateEvent: (event: EventObject) => void;
  dragingEventId?: string| number;
}

const DayColumnWeek: React.FC<DayColumnWeekProps> = ({
  events,
  boxHeight,
  boxDay,

  dragBoxMouseEnterToCell,
  calenderToAddOrUpdateEvent,
  dragingEventId,
}) => {
  const BoxRef = useRef<HTMLDivElement>(null);

 /**
 * Handle event while entering in box
 * @param {MouseEvent} e
 */
const dragMouseEnter = (e: MouseEvent) => {
  e.preventDefault();
  dragBoxMouseEnterToCell(boxDay);
};

  /**
   * Handle click on hour box
   * @param {*} e
   * @param {Number} hour
   */
  const handleClickHourBox = (e: React.MouseEvent<HTMLDivElement>, hour: number) => {
    e.preventDefault();
    e.stopPropagation();

    calenderToAddOrUpdateEvent({
      isResizable: false,
      isDragable: false,
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
      BoxRef.current?.removeEventListener('mouseenter', dragMouseEnter, true);
    };
  }, [dragingEventId]);
if(events.length){
 console.log("events------Day column",events)
}
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
               // calenderTableRef={calenderTableRef}
                boxHeight={boxHeight}
                dragingEventId={dragingEventId}
              //  updateEvent={updateEvent}
               // calenderToAddOrUpdateEvent={calenderToAddOrUpdateEvent}
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
              style={{ height: boxHeight + 'px'}}
              draggable={true} 
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
interface CurrentTimeBarProps {
  boxHeight: number;
}

const CurrentTimeBar: React.FC<CurrentTimeBarProps> = ({ boxHeight }) => {
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
      calculateTopCurrentTime();
    }, 10000);
    return () => clearInterval(interval);
  }, [boxHeight]);

  return (
    <div style={{ top: top + 'px' }} className="ib__sc__daybar-week"></div>
  );
};

export default DayColumnWeek;
