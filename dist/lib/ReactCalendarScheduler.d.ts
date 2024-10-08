import React from 'react';
import './index.css';
import { CalenderType } from './type/Calendar';
import { EventObjectInput } from './type/EventObject';
import { Team } from './type/team';
interface Props {
    selectedDate?: Date;
    calenderType?: CalenderType;
    monthCalenderTitleFormate?: string;
    monthCalenderTitle?: string;
    monthCalenderDayHeight?: number;
    minimumEventThickness?: number;
    weekHourBoxHeight?: number;
    weekCalenderNextBtnDayIncrement?: number;
    startingWeekday?: number;
    weekCalenderDayStartFromHour?: number;
    weekCalenderVisibleHour?: number;
    weekCalenderTitleFormate?: string | ((date: Date) => React.ReactNode);
    calenderHeight?: number;
    weekCalenderTimeFormate?: number;
    monthCalenderMinCellHeight?: number;
    disableEventModal?: boolean;
    disableAddEventModal?: boolean;
    showAddNewEventButton?: boolean;
    calendarHeaderComponent?: React.ReactNode;
    handleUpdateEvent?: (event: EventObjectInput) => void;
    handleAddNewEvent?: (event: EventObjectInput) => void;
    handleDeleteEvent?: (event: EventObjectInput) => void;
    handleEventClick?: (event: EventObjectInput) => void;
    handleColumnClick?: (event: EventObjectInput) => void;
    handleNextClick?: () => void;
    handlePrevClick?: () => void;
    handleCalendarTypeChange?: (type: CalenderType) => void;
    handleChangeCurrentDate?: (date: Date, calenderType: CalenderType) => void;
    handleIncreaseTimeSpan?: () => void;
    teams?: Team[];
    events: EventObjectInput[];
    calendarSwitchOptions?: CalenderType[];
}
declare function ReactCalendarScheduler({ selectedDate, calenderType: _calenderType, // week or day
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
disableEventModal, //disable event modal
showAddNewEventButton, //show add new event button
calendarHeaderComponent, //calendar header component
disableAddEventModal, //disable add event modal
handleUpdateEvent: _handleUpdateEvent, //update event
handleAddNewEvent: _handleAddNewEvent, //add new event
handleDeleteEvent: _handleDeleteEvent, //delete event
handleEventClick: _handleEventClick, //event click
handleColumnClick: _handleColumnClick, //column click
handleNextClick: _handleNextClick, //next button click
handlePrevClick: _handlePrevClick, //prev button click
handleCalendarTypeChange: _handleCalendarTypeChange, //calender type change
handleChangeCurrentDate: _handleChangeCurrentDate, //change current date
handleIncreaseTimeSpan: _handleIncreaseTimeSpan, //increase time span
events, teams, calendarSwitchOptions }: Props): JSX.Element;
export default ReactCalendarScheduler;
