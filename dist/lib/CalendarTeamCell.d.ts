/// <reference types="react" />
import { EventObject } from './type/EventObject';
import { Team } from './type/team';
interface CalendarTeamCellProps {
    team: Team;
    date: Date;
    events: EventObject[];
    updateEvent?: (event: EventObject) => void;
    calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
    currentBoxHeight: number;
    dragBoxMouseEnterToCell: (boxDay: Date, userId: string | number) => void;
    dragingEventId: number | undefined;
    resizingEventId: number | undefined;
    userId: string | number;
}
declare function CalendarTeamCell({ team, date, events, calenderToAddOrUpdateEvent, currentBoxHeight, dragBoxMouseEnterToCell, dragingEventId, resizingEventId, userId }: CalendarTeamCellProps): JSX.Element;
export default CalendarTeamCell;
