import React from 'react';
import { EventObject } from './type/EventObject';
interface EventBoxMonthProps {
    boxHeight: number;
    boxTime: number;
    eventObj: EventObject;
    boxDay: number;
    isCalender: boolean;
    isDraging: boolean;
    isResizing: boolean;
}
declare const EventBoxMonth: React.FC<EventBoxMonthProps>;
export default EventBoxMonth;
