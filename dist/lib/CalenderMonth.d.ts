/// <reference types="react" />
import { EventObject } from './type/EventObject';
interface CalenderMonthProps {
    currentDay: Date;
    eventsData: EventObject[];
    updateEvent: (event: EventObject) => void;
    calenderType: string;
    startingWeekday: number;
    monthCalenderDayHeight: number;
    selectedDate: Date;
    dayStartFrom: number;
    monthCalenderTitleFormate: string;
    monthCalenderTitle: string;
    minimumEventThickness: number;
    calenderHeight: number;
    isShowAddNewEventButton?: boolean;
    calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
    monthCalenderMinCellHeight: number;
    handleNextClick?: (date: Date, calenderType: string) => void;
    handlePrevClick?: (date: Date, calenderType: string) => void;
    handleChangeCurrentDate?: (date: Date, calenderType: string) => void;
    handleClanderTypeChange: (calenderType: string) => void;
}
declare function CalenderMonth({ currentDay, eventsData, updateEvent, calenderType, startingWeekday, monthCalenderDayHeight, isShowAddNewEventButton, dayStartFrom, monthCalenderTitleFormate, monthCalenderTitle, calenderHeight, minimumEventThickness, calenderToAddOrUpdateEvent, monthCalenderMinCellHeight: boxHeight, handleNextClick: _handleNextClick, handlePrevClick: _handlePrevClick, handleChangeCurrentDate: _handleChangeCurrentDate, handleClanderTypeChange, }: CalenderMonthProps): JSX.Element;
export default CalenderMonth;
