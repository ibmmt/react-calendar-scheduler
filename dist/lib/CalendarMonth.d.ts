import React from 'react';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
interface CalenderMonthProps {
    currentDay: Date;
    eventsData: EventObject[];
    updateEvent: (event: EventObject) => void;
    calendarType: CalenderType;
    startingWeekday: number;
    monthViewDayHeight: number;
    selectedDate: Date;
    dayStartFrom: number;
    eventHeight: number;
    calendarHeight: number;
    showAddNewEventButton?: boolean;
    calendarHeader?: React.ReactNode;
    calendarToAddOrUpdateEvent: (eventObj: EventObject) => void;
    monthViewMinCellHeight: number;
    onNextClick?: (date: Date, calendarType: string) => void;
    onPrevClick?: (date: Date, calendarType: string) => void;
    onDateChange?: (date: Date, calendarType: CalenderType) => void;
    calendarViewOptions?: CalenderType[];
    monthViewDayTitleFormat?: string | ((day: string) => React.ReactNode);
    onCalendarTypeChange: (calendarType: CalenderType) => void;
}
declare function CalenderMonth({ currentDay, eventsData, updateEvent, calendarType, startingWeekday, showAddNewEventButton, monthViewDayTitleFormat, calendarHeight, eventHeight, calendarHeader, calendarToAddOrUpdateEvent, monthViewMinCellHeight: boxHeight, onNextClick: _onNextClick, onPrevClick: _onPrevClick, onDateChange: _onDateChange, calendarViewOptions, onCalendarTypeChange, }: CalenderMonthProps): JSX.Element;
export default CalenderMonth;
