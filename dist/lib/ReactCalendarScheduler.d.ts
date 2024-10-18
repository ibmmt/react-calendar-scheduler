import React from 'react';
import './index.css';
import { CalenderType } from './type/Calendar';
import { EventObjectInput } from './type/EventObject';
import { Team } from './type/team';
interface Props {
    selectedDate?: Date;
    calendarType?: CalenderType;
    monthViewDayTitleFormat?: "long" | "short" | ((day: string) => React.ReactNode);
    monthViewDayHeight?: number;
    minimumEventHeight?: number;
    weekHourCellHeight?: number;
    weekViewNextButtonDayIncrement?: number;
    startingWeekday?: number;
    weekViewStartHour?: number;
    weekViewVisibleHours?: number;
    weekViewDayTitleFormat?: string | ((date: Date) => React.ReactNode);
    calendarHeight?: number;
    weekViewTimeFormat?: number;
    monthViewMinCellHeight?: number;
    disableEventModal?: boolean;
    disableAddEventModal?: boolean;
    showAddNewEventButton?: boolean;
    calendarHeader?: React.ReactNode;
    onUpdateEvent?: (event: EventObjectInput) => void;
    onAddEvent?: (event: EventObjectInput) => void;
    onDeleteEvent?: (event: EventObjectInput) => void;
    onEventClick?: (event: EventObjectInput) => void;
    onColumnClick?: (event: EventObjectInput) => void;
    onNextClick?: () => void;
    onPrevClick?: () => void;
    onCalendarTypeChange?: (type: CalenderType) => void;
    onDateChange?: (date: Date, calendarType: CalenderType) => void;
    onIncreaseTimeSpan?: () => void;
    teams?: Team[];
    events: EventObjectInput[];
    calendarViewOptions?: CalenderType[];
}
declare function ReactCalendarScheduler({ selectedDate, calendarType: _calendarType, // week or day
monthViewDayHeight, //day column height
minimumEventHeight, //minimum event thickness
calendarHeight, //calendar height
weekHourCellHeight: _weekHourCellHeight, weekViewNextButtonDayIncrement, //day increment on next button click
startingWeekday, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
weekViewStartHour, //day start from hour,
weekViewVisibleHours, //day visible hour
weekViewDayTitleFormat, //day column title format
weekViewTimeFormat, //day column title format
monthViewMinCellHeight, //minimum cell height
disableEventModal, //disable event modal
showAddNewEventButton, //show add new event button
calendarHeader, //calendar header component
disableAddEventModal, //disable add event modal
onUpdateEvent: _onUpdateEvent, //update event
onAddEvent: _onAddEvent, //add new event
onDeleteEvent: _onDeleteEvent, //delete event
onEventClick: _onEventClick, //event click
onColumnClick: _onColumnClick, //column click
onNextClick: _onNextClick, //next button click
onPrevClick: _onPrevClick, //prev button click
onCalendarTypeChange: _onCalendarTypeChange, //calendar type change
onDateChange: _onDateChange, //change current date
onIncreaseTimeSpan: _onIncreaseTimeSpan, //increase time span
events, teams, calendarViewOptions, monthViewDayTitleFormat }: Props): JSX.Element;
export default ReactCalendarScheduler;
