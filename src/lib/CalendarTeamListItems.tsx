import { isDateBetween } from './_utils';
import CalendarTeamCell from './CalendarTeamCell';
import { EventObject } from './type/EventObject';
import { Team } from './type/team';

interface CalendarTeamListItemsProps {
  teams: Team[];
  eventsData: EventObject[];
  selectedWeekStartDate: Date;
  updateEvent: (event: EventObject) => void;
  calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
  monthCalenderMinCellHeight: number;
  boxHeight: number;
  minimumEventThickness: number;
  // ... other props
}

function CalendarTeamListItems({
  teams,
  eventsData,
  selectedWeekStartDate,
  updateEvent,
  calenderToAddOrUpdateEvent,
 
    boxHeight,
    minimumEventThickness
  // ... other props
}: CalendarTeamListItemsProps) {
  const rows = teams.map((team) => {
    const cells = [];
    const startOfWeek = new Date(selectedWeekStartDate);
    const dayOfWeek = startOfWeek.getDay();
    
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    let minPercentage = 100;
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
             minPercentage = Math.min(minPercentage, event.width || 100);
             return true; }
            return false; 
        });

      let currentBoxHeight = boxHeight;
      if ((minPercentage * boxHeight) / 100 < minimumEventThickness) {
        currentBoxHeight = (minimumEventThickness * 100) / minPercentage;
      }

      

      cells.push(
        <CalendarTeamCell
          key={i}
          team={team}
          date={date}
          events={eventsForUserOnDate}
          updateEvent={updateEvent}
          calenderToAddOrUpdateEvent={calenderToAddOrUpdateEvent}
            currentBoxHeight={currentBoxHeight}
          // ... other props
        />
      );
    }

    return (
      <tr key={team.userId}>
        <td className="ib__sc__table-td team-cell">
          {team.profilepic && <img src={team.profilepic} alt={team.name} className="team-profile-pic" />}
         {team.name && <span>{team.name}</span>}
         {team.profileComponent && team.profileComponent}
        </td>
        {cells}
      </tr>
    );
  });

  return <>{rows}</>;
}

export default CalendarTeamListItems;
