import React from 'react';

import { EventHandlerContex } from './Contex';
import EventBoxMonth from './EventBoxMonth';

import { EventObject } from './type/EventObject';
import { Team } from './type/team';

interface CalendarTeamCellProps {
  team: Team;
  date: Date;
  events: EventObject[];
  updateEvent: (event: EventObject) => void;
  calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
  currentBoxHeight: number;
//   dragingEventId: number | undefined;
//   resizingEventId: number | undefined;
}

function CalendarTeamCell({
  team,
  date,
  events,
  updateEvent,
  calenderToAddOrUpdateEvent,
  currentBoxHeight,
//   dragingEventId,
//   resizingEventId
}: CalendarTeamCellProps) {
//   const BoxRef = useRef<HTMLTableCellElement>(null);
//   const currentDragDate = useRef<number>();
//   const editingEventRef = useRef<EventObject | null>(null);
//   const sideUseRef = useRef<string>('');
//   const [isDraging, setIsDraging] = useState(false);

//   const dragStart = (event: EventObject, selectedDate: number) => {
//     if (event.isDragable === false) return;
//     currentDragDate.current = selectedDate;
//     editingEventRef.current = { ...event, left: "0", width: 100 };
//     setIsDraging(true);
//   };

//   const dragMouseEnter = (e: MouseEvent) => {
//     e.preventDefault();
//     if (!editingEventRef.current) return;
//     if (!currentDragDate.current) return;

//     const newEvent = editingEventRef.current;
//     const daysDiff = getDaysDifference(date, new Date(currentDragDate.current));

//     if (daysDiff === 0) return;
//     if(newEvent.startTime){
//        newEvent.startTime += daysDiff * 24 * HOUR_MILLISECONDS;
//     }

//     if(newEvent.endTime){
//     newEvent.endTime += daysDiff * 24 * HOUR_MILLISECONDS;
//     }

//     editingEventRef.current = newEvent;
//     currentDragDate.current = date.getTime();
//     updateEvent({ ...newEvent });
//   };

//   const dropHandler = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (e) {
//       e.preventDefault();
//     }
//     sideUseRef.current = '';
//     if (editingEventRef.current) {
//       updateEvent({ ...editingEventRef.current });
//       editingEventRef.current = null;
//     }
//     setIsDraging(false);
//   };

//   useEffect(() => {
//     if (!BoxRef.current) return;
//     if (!isDraging) return;

//     BoxRef.current?.addEventListener('mouseenter', dragMouseEnter, true);
//     return () => {
//       BoxRef.current?.removeEventListener('mouseenter', dragMouseEnter, true);
//     };
//   }, [isDraging]);

  const handleClickBox: React.MouseEventHandler<HTMLTableCellElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    calenderToAddOrUpdateEvent({
      isDragable: false,
      isResizable: false,
      startTime: date.setHours(0, 0, 0, 0),
      endTime: date.setHours(1, 0, 0, 0),
      userId: team.userId,
    });
  };

  return (
    <td
     // ref={BoxRef}
      className="ib__sc__table-td ib__sc__table-team-td-team"
      onClick={handleClickBox}
    >
    <div className='ib__sc__team-cell__team' style={
        {minHeight:currentBoxHeight + 20}
    }>
        
      <EventHandlerContex.Provider
        value={{
        //  dragStart,
        //  resizeStart: () => {},
          updateEvent: updateEvent,
          calenderToAddOrUpdateEvent,
         /// dragEnd: dropHandler,
        //  resizeEnd: dropHandler,
        }}
      >
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
            isDraging={ false}
            isResizing={false}
            
            />
          ))}
        </div>
      </EventHandlerContex.Provider>
        </div>
    </td>
  );
}

export default CalendarTeamCell;
