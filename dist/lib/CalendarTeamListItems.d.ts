/// <reference types="react" />
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
    dragBoxMouseEnterToCell: (boxDay: Date, userId: string | number) => void;
    dragingEventId: number | undefined;
    resizingEventId: number | undefined;
}
declare function CalendarTeamListItems({ teams, eventsData, selectedWeekStartDate, updateEvent, calenderToAddOrUpdateEvent, dragBoxMouseEnterToCell, dragingEventId, resizingEventId, boxHeight, minimumEventThickness }: CalendarTeamListItemsProps): JSX.Element;
export default CalendarTeamListItems;
