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
    isShowAddNewEventButton?: boolean;
    weekCalenderTimeFormate: number;
    noOfDayColumn: number;
    calenderHeight: number;
    weekCalenderNextBtnDayIncrement: number;
    handleNextClick?: (date: Date, calenderType: string) => void;
    handlePrevClick?: (date: Date, calenderType: string) => void;
    handleChangeCurrentDate?: (date: Date, calenderType: string) => void;
    calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
    handleIncreaseTimeSpan: (value: number) => void;
    handleClanderTypeChange: (calenderType: string) => void;
    minimumEventThickness: number;
}
declare const CalendarWeek: React.FC<Props>;
export default CalendarWeek;
