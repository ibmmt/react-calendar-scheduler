import React, { useEffect, useRef } from 'react';
import { HOUR_MILLISECONDS } from './Constant';
import EventBoxMonth from './EventBoxMonth';

export default function DayCellMonth({
  currentBoxHeight,
  eventsInDay,
  boxHeight,
  boxDay,
  day,
  dragingEventId,
  resizingEventId,
  calanderToAddOrUpdateEvent,
  dragBoxMouseEnterToCell,
}) {
  const BoxRef = useRef();
  /**
   * Handle event while eneter in box
   * @param {Event} e
   */
  const dragMouseEnter = e => {
    e.preventDefault();
    dragBoxMouseEnterToCell(boxDay);
  };

  const handleClickBox = e => {
    e.preventDefault();
    e.stopPropagation();
    calanderToAddOrUpdateEvent({
      startTime: new Date(boxDay).setHours(0, 0, 0, 0),
      endTime: new Date(boxDay + 24 * HOUR_MILLISECONDS).setHours(0, 0, 0, 0),
    });
  };

  /**
   * Add event listener on mouse enter
   */
  useEffect(() => {
    if (!BoxRef.current) return;
    if (dragingEventId == undefined && resizingEventId == undefined) return;

    BoxRef.current.addEventListener('mouseenter', dragMouseEnter, true);
    return () => {
      BoxRef.current.removeEventListener('mouseenter', dragMouseEnter, true);
    };
  }, [dragingEventId, resizingEventId]);
  return (
    <td
      ref={BoxRef}
      className=" ib__sc__table-td ib__sc__table-td-month"
      onClick={handleClickBox}
      style={{ height: `${currentBoxHeight}px` }}
    >
      <div className="ib__sc_month_cell_wrapper">
        <span className="ib__sc_month_day">{day}</span>
      </div>

      <div
        className="ib__sc__table-td__day_cell"
        style={{ minHeight: `${currentBoxHeight}px` }}
      >
        {eventsInDay.map((event, key) => (
          <EventBoxMonth
            key={key}
            eventObj={event}
            boxHeight={boxHeight}
            boxTime={1}
            boxDay={boxDay}
            isDraging={dragingEventId == event.sc_app__id}
            isResizing={resizingEventId == event.sc_app__id}
            isCalander={true}
          />
        ))}
      </div>
    </td>
  );
}
