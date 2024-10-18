import React from 'react';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
import { Team } from './type/team';
interface CalendarTeamProps {
    currentDay?: Date;
    eventsData: EventObject[];
    teams: Team[];
    selectedDate: Date;
    calendarType: CalenderType;
    calendarViewOptions?: CalenderType[];
    onDateChange?: (date: Date, calendarType: CalenderType) => void;
    updateEvent: (event: EventObject) => void;
    onCalendarTypeChange: (calendarType: CalenderType) => void;
    calendarToAddOrUpdateEvent: (eventObj: EventObject) => void;
    onNextClick?: (date: Date, calendarType: CalenderType) => void;
    onPrevClick?: (date: Date, calendarType: CalenderType) => void;
    weekViewDayTitleFormat?: string | ((date: Date) => React.ReactNode);
    showAddNewEventButton?: boolean;
    minimumEventHeight?: number;
    calendarHeader?: React.ReactNode;
}
declare function CalendarTeam({ currentDay, eventsData, teams, selectedDate, calendarType, onDateChange, updateEvent, onCalendarTypeChange, calendarToAddOrUpdateEvent, onNextClick: _onNextClick, onPrevClick: _onPrevClick, minimumEventHeight, calendarHeader, calendarViewOptions, showAddNewEventButton, weekViewDayTitleFormat, }: CalendarTeamProps): JSX.Element;
export default CalendarTeam;
