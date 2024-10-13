import React, { useEffect, useRef } from 'react';
import EventBoxMonth from './EventBoxMonth';

import { EventObject } from './type/EventObject';
import { Team } from './type/team';

interface CalendarTeamCellProps {
  team: Team;
  date: Date;
  events: EventObject[];
  updateEvent?: (event: EventObject) => void;
  calendarToAddOrUpdateEvent: (eventObj: EventObject) => void;
  currentBoxHeight: number;
  dragBoxMouseEnterToCell: (boxDay: Date,userId:string | number ) => void;
  dragingEventId: number | undefined;
  resizingEventId: number | undefined;
  userId: string | number;
}

function CalendarTeamCell({
  team,
  date,
  events,
  calendarToAddOrUpdateEvent,
  currentBoxHeight,
  dragBoxMouseEnterToCell,
  dragingEventId,
  resizingEventId,
  userId
}: CalendarTeamCellProps) {
  const BoxRef = useRef<HTMLTableCellElement>(null);
 



  /**
   * Handle event while eneter in box
   * @param {React.MouseEvent<HTMLTableCellElement>} e
   */
  const dragMouseEnter = (e: MouseEvent) => {
    e.preventDefault();
    dragBoxMouseEnterToCell(new Date(date),userId);
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


  const handleClickBox: React.MouseEventHandler<HTMLTableCellElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    calendarToAddOrUpdateEvent({
      isDragable: false,
      isResizable: false,
      startTime: date.setHours(0, 0, 0, 0),
      endTime: date.setHours(1, 0, 0, 0),
      userId: team.userId,
    });
  };

  return (
    <td
     ref={BoxRef}
      className="ib__sc__table-td ib__sc__table-team-td-team"
      onClick={handleClickBox}
    >
    <div className='ib__sc__team-cell__team' style={
        {minHeight:currentBoxHeight + 20}
    }>
      
    
        <div className="ib__sc__table-td__team_cell">
          {events.map((event, key) => (
            <EventBoxMonth
              key={key}
              eventObj={event}
              boxHeight={50}
        
              boxDay={date.getTime()}
              isDragable={event.isDragable}
            //   isDraging={dragingEventId=== event.sc_app__id}
            //   isResizing={resizingEventId === event.sc_app__id}
            isDraging={ dragingEventId=== event.sc_app__id}
            isResizing={resizingEventId === event.sc_app__id}
            
            />
          ))}
        </div>

        </div>
    </td>
  );
}

export default CalendarTeamCell;
