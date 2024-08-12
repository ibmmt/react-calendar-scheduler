import React from 'react';
import { EventObject } from './type/EventObject';
interface Props {
    eventsData: EventObject[];
    updateEvent: (event: EventObject) => void;
    selectedDate: Date | undefined;
    calenderType: string;
    weekHourBoxHeight?: number;
    startingWeekday: number;
    weekCalenderDayStartFromHour: number;
    weekCalenderVisibleHour: number;
    weekCalenderTitleFormate?: string;
    showAddNewEventButton?: boolean;
    weekCalenderTimeFormate: number;
    noOfDayColumn: number;
    calenderHeight: number;
    weekCalenderNextBtnDayIncrement: number;
    handleNextClick?: (date: Date, calenderType: string) => void;
    handlePrevClick?: (date: Date, calenderType: string) => void;
    handleChangeCurrentDate?: (date: Date, calenderType: string) => void;
    calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
    handleIncreaseTimeSpan: (value: number) => void;
    handleCalendarTypeChange: (calenderType: string) => void;
    minimumEventThickness: number;
    calendarHeaderComponent: React.ReactNode;
}
declare const CalendarWeek: React.FC<Props>;
export default CalendarWeek;
