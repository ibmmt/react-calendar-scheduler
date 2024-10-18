/// <reference types="react" />
import { EventObject } from './type/EventObject';
interface DayCellMonthProps {
    currentBoxHeight: number;
    eventsInDay: EventObject[];
    boxHeight: number;
    boxDay: number;
    day: number;
    dragingEventId: number | undefined;
    resizingEventId: number | undefined;
    calendarToAddOrUpdateEvent: (event: EventObject) => void;
    dragBoxMouseEnterToCell: (boxDay: Date) => void;
    isCurrentDay: boolean;
}
export default function DayCellMonth({ currentBoxHeight, eventsInDay, boxHeight, boxDay, day, dragingEventId, resizingEventId, calendarToAddOrUpdateEvent, dragBoxMouseEnterToCell, isCurrentDay }: DayCellMonthProps): JSX.Element;
export {};
