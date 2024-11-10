import { isDateBetween } from './_utils';
import CalendarTeamCell from './CalendarTeamCell';
import { EventObject } from './type/EventObject';
import { Team } from './type/team';

interface CalendarTeamListItemsProps {
  teams: Team[];
  eventsData: EventObject[];
  selectedWeekStartDate: Date;
  updateEvent: (event: EventObject) => void;
  calendarToAddOrUpdateEvent: (eventObj: EventObject) => void;
  monthViewMinCellHeight: number;
  boxHeight: number;
  eventHeight: number;
  dragBoxMouseEnterToCell: (boxDay: Date,userId:string | number) => void;
  dragingEventId: number | undefined;
    resizingEventId: number | undefined;

  // ... other props
}

function CalendarTeamListItems({
  teams,
  eventsData,
  selectedWeekStartDate,
  updateEvent,
  calendarToAddOrUpdateEvent,
  dragBoxMouseEnterToCell,
    dragingEventId,
    resizingEventId,
    boxHeight,
    eventHeight
  // ... other props
}: CalendarTeamListItemsProps) {
  const rows = teams.map((team) => {
    const cells = [];
    const startOfWeek = new Date(selectedWeekStartDate);
    const dayOfWeek = startOfWeek.getDay();
    
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    let maxOverlap = 0;
    for (let i = 0; i < 7; i++) {
        
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      
      const eventsForUserOnDate = eventsData.filter(
        (event) =>{
         if( event.userId === team.userId &&
          event.startTime &&
          (new Date(event.startTime).toDateString() === date.toDateString() ||
          event.endTime && (isDateBetween(date,event.startTime,event.endTime)))
            ){ 
           maxOverlap= Math.max(maxOverlap,event.noOfOverLeftLap || 0);
             return true; }
            return false; 
        });

      const currentBoxHeight = Math.max((maxOverlap+1) * eventHeight,boxHeight);

  

      cells.push(
        <CalendarTeamCell
          eventHeight={eventHeight}
          key={i+ (""+team.userId)}
          team={team}
          date={date}
          dragingEventId={dragingEventId}
          resizingEventId={resizingEventId}
          userId={team.userId}
          events={eventsForUserOnDate}
          updateEvent={updateEvent}
          calendarToAddOrUpdateEvent={calendarToAddOrUpdateEvent}
            currentBoxHeight={currentBoxHeight}
            dragBoxMouseEnterToCell={dragBoxMouseEnterToCell}
          // ... other props
        />
      );
    }

    return (
      <tr key={team.userId}>
        <td className="ib__sc__table-td ib__sc__team-cell">
          <div className='ib__sc__team-team-wrap'>
          {team.image && 
          <div className='ib__sc__team-profile-pic-wrap'><img src={team.image} alt={team.name} className="ib__sc__team-profile-pic" /> </div>}
          <div className='ib__sc__team-profile-content-wrap'>

         {team.name && <span>{team.name}</span>}
         {team.profileComponent && team.profileComponent}
         </div>
         </div>
        </td>
        {cells}
      </tr>
    );
  });

  return <>{rows}</>;
}

export default CalendarTeamListItems;
