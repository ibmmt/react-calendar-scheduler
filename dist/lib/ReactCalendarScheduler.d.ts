/// <reference types="react" />
import './index.css';
import { EventObjectInput } from './type/EventObject';
interface Props {
    selectedDate?: Date;
    calenderType?: string;
    monthCalenderTitleFormate?: string;
    monthCalenderTitle?: string;
    monthCalenderDayHeight?: number;
    minimumEventThickness?: number;
    weekHourBoxHeight?: number;
    weekCalenderNextBtnDayIncrement?: number;
    startingWeekday?: number;
    weekCalenderDayStartFromHour?: number;
    weekCalenderVisibleHour?: number;
    weekCalenderTitleFormate?: string;
    calenderHeight?: number;
    weekCalenderTimeFormate?: number;
    monthCalenderMinCellHeight?: number;
    disabaleEventPopup?: boolean;
    disabaleAddEventPopup?: boolean;
    isShowAddNewEventButton?: boolean;
    handleUpdateEvent?: (event: EventObjectInput) => void;
    handleAddNewEvent?: (event: EventObjectInput) => void;
    handleDeleteEvent?: (event: EventObjectInput) => void;
    handleEventClick?: (event: EventObjectInput) => void;
    handleColumnClick?: (event: EventObjectInput) => void;
    handleNextClick?: () => void;
    handlePrevClick?: () => void;
    handleClanderTypeChange?: (type: string) => void;
    handleChangeCurrentDate?: (date: Date, calenderType: string) => void;
    handleIncreaseTimeSpan?: () => void;
    events: EventObjectInput[];
}
declare function ReactCalendarScheduler({ selectedDate, calenderType: _calenderType, // week or day
monthCalenderTitleFormate, //month title format
monthCalenderTitle, //day column title format
monthCalenderDayHeight, //day column height
minimumEventThickness, //minimum event thickness
calenderHeight, //calender height
weekHourBoxHeight: _weekHourBoxHeight, weekCalenderNextBtnDayIncrement, //day increment on next button click
startingWeekday, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
weekCalenderDayStartFromHour, //day start from hour,
weekCalenderVisibleHour, //day visible hour
weekCalenderTitleFormate, //day column title format
weekCalenderTimeFormate, //day column title format
monthCalenderMinCellHeight, //minimum cell height
disabaleEventPopup, //disable event popup
isShowAddNewEventButton, //show add new event button
disabaleAddEventPopup, //disable add event popup
handleUpdateEvent: _handleUpdateEvent, //update event
handleAddNewEvent: _handleAddNewEvent, //add new event
handleDeleteEvent: _handleDeleteEvent, //delete event
handleEventClick: _handleEventClick, //event click
handleColumnClick: _handleColumnClick, //column click
handleNextClick: _handleNextClick, //next button click
handlePrevClick: _handlePrevClick, //prev button click
handleClanderTypeChange: _handleClanderTypeChange, //calender type change
handleChangeCurrentDate: _handleChangeCurrentDate, //change current date
handleIncreaseTimeSpan: _handleIncreaseTimeSpan, //increase time span
events, }: Props): JSX.Element;
export default ReactCalendarScheduler;
