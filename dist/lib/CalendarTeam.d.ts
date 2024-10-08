import React from 'react';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
import { Team } from './type/team';
interface CalendarTeamProps {
    currentDay?: Date;
    eventsData: EventObject[];
    teams: Team[];
    selectedDate: Date;
    calenderType: CalenderType;
    calendarSwitchOptions?: CalenderType[];
    handleChangeCurrentDate?: (date: Date, calenderType: CalenderType) => void;
    updateEvent: (event: EventObject) => void;
    handleCalendarTypeChange: (calenderType: CalenderType) => void;
    calenderToAddOrUpdateEvent: (eventObj: EventObject) => void;
    handleNextClick?: (date: Date, calenderType: CalenderType) => void;
    handlePrevClick?: (date: Date, calenderType: CalenderType) => void;
    minimumEventThickness?: number;
    calendarHeaderComponent?: React.ReactNode;
}
declare function CalendarTeam({ currentDay, eventsData, teams, selectedDate, calenderType, handleChangeCurrentDate, updateEvent, handleCalendarTypeChange, calenderToAddOrUpdateEvent, handleNextClick: _handleNextClick, handlePrevClick: _handlePrevClick, minimumEventThickness, calendarHeaderComponent, calendarSwitchOptions, }: CalendarTeamProps): JSX.Element;
export default CalendarTeam;
