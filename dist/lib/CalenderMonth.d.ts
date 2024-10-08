import React from 'react';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
interface CalenderMonthProps {
    currentDay: Date;
    eventsData: EventObject[];
    updateEvent: (event: EventObject) => void;
    calenderType: CalenderType;
    startingWeekday: number;
    monthCalenderDayHeight: number;
    selectedDate: Date;
    dayStartFrom: number;
    minimumEventThickness: number;
    calenderHeight: number;
    showAddNewEventButton?: boolean;
    calendarHeaderComponent?: React.ReactNode;
    calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
    monthCalenderMinCellHeight: number;
    handleNextClick?: (date: Date, calenderType: string) => void;
    handlePrevClick?: (date: Date, calenderType: string) => void;
    handleChangeCurrentDate?: (date: Date, calenderType: CalenderType) => void;
    calendarSwitchOptions?: CalenderType[];
    handleCalendarTypeChange: (calenderType: CalenderType) => void;
}
declare function CalenderMonth({ currentDay, eventsData, updateEvent, calenderType, startingWeekday, showAddNewEventButton, calenderHeight, minimumEventThickness, calendarHeaderComponent, calenderToAddOrUpdateEvent, monthCalenderMinCellHeight: boxHeight, handleNextClick: _handleNextClick, handlePrevClick: _handlePrevClick, handleChangeCurrentDate: _handleChangeCurrentDate, calendarSwitchOptions, handleCalendarTypeChange, }: CalenderMonthProps): JSX.Element;
export default CalenderMonth;
