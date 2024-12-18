import React from 'react';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
interface Props {
    eventsData: EventObject[];
    updateEvent: (event: EventObject) => void;
    selectedDate: Date | undefined;
    calendarType: CalenderType;
    weekHourCellHeight?: number;
    startingWeekday: number;
    weekViewStartHour: number;
    weekViewVisibleHours: number;
    weekViewDayTitleFormat?: string | ((date: Date) => React.ReactNode);
    showAddNewEventButton?: boolean;
    weekViewTimeFormat: number;
    noOfDayColumn: number;
    calendarHeight: number;
    weekViewNextButtonDayIncrement: number;
    onNextClick?: (date: Date, calendarType: string) => void;
    onPrevClick?: (date: Date, calendarType: string) => void;
    onDateChange?: (date: Date, calendarType: CalenderType) => void;
    calendarToAddOrUpdateEvent: (eventObj: EventObject) => void;
    onIncreaseTimeSpan: (value: number) => void;
    onCalendarTypeChange: (calendarType: CalenderType) => void;
    eventHeight: number;
    calendarHeader: React.ReactNode;
    calendarViewOptions?: CalenderType[];
    eventWidth: number;
}
declare const CalendarWeek: React.FC<Props>;
export default CalendarWeek;
