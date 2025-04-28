import React from 'react';
interface EventBoxWeekProps {
    boxHeight: number;
    boxTime?: number;
    eventObj: any;
    boxDay: any;
    dragingEventId: any;
    eventWidth: number;
    minWidthOfCloumn: number;
}
declare const EventBoxWeek: React.FC<EventBoxWeekProps>;
export default EventBoxWeek;
