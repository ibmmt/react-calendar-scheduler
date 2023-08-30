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
    calenderToAddOrUpdateEvent: (event: EventObject) => void;
    dragBoxMouseEnterToCell: (boxDay: Date) => void;
}
export default function DayCellMonth({ currentBoxHeight, eventsInDay, boxHeight, boxDay, day, dragingEventId, resizingEventId, calenderToAddOrUpdateEvent, dragBoxMouseEnterToCell, }: DayCellMonthProps): JSX.Element;
export {};
