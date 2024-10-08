import React from 'react';
import { EventObject } from './type/EventObject';
interface EventBoxMonthProps {
    boxHeight: number;
    eventObj: EventObject;
    boxDay: number;
    isDraging: boolean;
    isResizing: boolean;
    isDragable: boolean;
}
declare const EventBoxMonth: React.FC<EventBoxMonthProps>;
export default EventBoxMonth;
