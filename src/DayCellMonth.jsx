import React, { useEffect, useRef } from 'react';
import EventBoxMonth from './EventBoxMonth';

export default function DayCellMonth({
  currentBoxHeight,
  eventsInDay,
  boxHeight,
  boxDay,
  day,
  dragingEventId,
  resizingEventId,
  dragBoxMouseEnterToCell,
}) {
  const BoxRef = useRef();
  /**
   * Handle event while eneter in box
   * @param {Event} e
   */
  const dragMouseEnter = e => {
    console.log('dragMouseEnter');
    e.preventDefault();

    dragBoxMouseEnterToCell(boxDay);
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
      //onClick={() => setSelectedDate(date)}
      style={{ height: `${currentBoxHeight}px` }}
    >
      <div
        className="ib__sc__table-td__day_cell"
        style={{ height: `${currentBoxHeight}px` }}
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
            calanderToAddOrUpdateEvent={() => {}}
            isCalander={true}
          />
        ))}
      </div>
      <span>{day}</span>
    </td>
  );
}
