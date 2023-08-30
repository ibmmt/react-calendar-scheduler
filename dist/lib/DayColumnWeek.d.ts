import React from 'react';
import { EventObject } from './type/EventObject';
interface DayColumnWeekProps {
    events: EventObject[];
    boxHeight: number;
    boxDay: Date;
    updateEvent: (event: EventObject) => void;
    calenderTableRef: React.RefObject<any>;
    dragBoxMouseEnterToCell: (day: Date) => void;
    calenderToAddOrUpdateEvent: (event: EventObject) => void;
    dragingEventId?: string | number;
}
declare const DayColumnWeek: React.FC<DayColumnWeekProps>;
export default DayColumnWeek;
