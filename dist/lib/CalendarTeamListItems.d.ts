/// <reference types="react" />
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
    minimumEventHeight: number;
    dragBoxMouseEnterToCell: (boxDay: Date, userId: string | number) => void;
    dragingEventId: number | undefined;
    resizingEventId: number | undefined;
}
declare function CalendarTeamListItems({ teams, eventsData, selectedWeekStartDate, updateEvent, calendarToAddOrUpdateEvent, dragBoxMouseEnterToCell, dragingEventId, resizingEventId, boxHeight, minimumEventHeight }: CalendarTeamListItemsProps): JSX.Element;
export default CalendarTeamListItems;
