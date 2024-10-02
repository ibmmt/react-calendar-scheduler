import React, { useEffect, useRef } from 'react';
import { HOUR_MILLISECONDS } from './Constant';
import EventBoxMonth from './EventBoxMonth';
import { EventObject } from './type/EventObject';

interface DayCellMonthProps {
  currentBoxHeight: number;
  eventsInDay: EventObject[];
  boxHeight: number;
  boxDay: number;
  day: number;
  dragingEventId: number | undefined;
  resizingEventId: number | undefined;
  calenderToAddOrUpdateEvent: (event: EventObject) => void;
  dragBoxMouseEnterToCell: (boxDay: Date) => void;
}

export default function DayCellMonth({
  currentBoxHeight,
  eventsInDay,
  boxHeight,
  boxDay,
  day,
  dragingEventId,
  resizingEventId,
  calenderToAddOrUpdateEvent,
  dragBoxMouseEnterToCell,
}: DayCellMonthProps) {
  const BoxRef = useRef<HTMLTableCellElement>(null);

  /**
   * Handle event while eneter in box
   * @param {React.MouseEvent<HTMLTableCellElement>} e
   */
  const dragMouseEnter = (e: MouseEvent) => {
    e.preventDefault();

    dragBoxMouseEnterToCell(new Date(boxDay));
  };

  const handleClickBox: React.MouseEventHandler<HTMLTableCellElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    calenderToAddOrUpdateEvent({
      isDragable: false,
      isResizable: false,
      startTime: new Date(boxDay).setHours(0, 0, 0, 0),
      endTime: new Date(boxDay + 24 * HOUR_MILLISECONDS).setHours(0, 0, 0, 0),
    });
  };
  
 

  /**
   * Add event listener on mouse enter
   */
  useEffect(() => {
    if (!BoxRef.current) return;
    if (dragingEventId === undefined && resizingEventId === undefined) return;

    BoxRef.current?.addEventListener('mouseenter', dragMouseEnter, true);
    return () => {
      BoxRef.current?.removeEventListener('mouseenter', dragMouseEnter, true);
    };
  }, [dragingEventId, resizingEventId]);

  return (
    <td
      ref={BoxRef}
      className=" ib__sc__table-td ib__sc__table-td-month"
      onClick={handleClickBox}
    >
      <div
        className="ib__sc_month_cell"
        style={{ minHeight: `${currentBoxHeight + 20}px` }}
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
              isDragable={event.isDragable}
              isDraging={dragingEventId === event.sc_app__id}
              isResizing={resizingEventId === event.sc_app__id}
              isCalender={true}
            />
          ))}
        </div>
      </div>
    </td>
  );
}
