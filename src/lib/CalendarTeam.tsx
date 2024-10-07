import React, { useEffect, useState } from 'react';
import { calculatePositions } from './_utils';
import CalendarTeamListItems from './CalendarTeamListItems';
import CalenderSwitch from './CalenderSwitch';
import { LeftIcon, RightIcon } from './Images';
import { CalenderType } from './type/Calendar';
import { EventObject } from './type/EventObject';
import { Team } from './type/team';

interface CalendarTeamProps {
  eventsData: EventObject[];
  teams: Team[];
  selectedDate: Date;
  calenderType:CalenderType;
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

const weekdaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function CalendarTeam({
  eventsData,
  teams,
  selectedDate,
  calenderType,
  handleChangeCurrentDate,
  updateEvent,
  handleCalendarTypeChange,
  calenderToAddOrUpdateEvent,
  handleNextClick: _handleNextClick,
  handlePrevClick: _handlePrevClick,
  minimumEventThickness=30,
  calendarHeaderComponent,
  calendarSwitchOptions,

 // monthCalenderMinCellHeight: boxHeight = 60,
}: CalendarTeamProps) {
  const [selectedWeekStartDate, setSelectedWeekStartDate] = useState<Date>(selectedDate);
  const [events, setEvents] = useState<EventObject[]>( calculatePositions(eventsData, 'month'));

  useEffect(() => {
    if (selectedDate) {
      setSelectedWeekStartDate(selectedDate);
    }
  }, [selectedDate]);

    useEffect(() => {
        setEvents(calculatePositions(eventsData, calenderType));
    }, [eventsData, calenderType]);

  const onWeekChangeNextPrev = (value: number) => {
    const newDate = new Date(selectedWeekStartDate);
    newDate.setDate(newDate.getDate() + value * 7);
    setSelectedWeekStartDate(newDate);
    if (value > 0) {
      _handleNextClick && _handleNextClick(newDate, calenderType);
    } else {
      _handlePrevClick && _handlePrevClick(newDate, calenderType);
    }
  };

  const selectWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!newDate || isNaN(newDate.getTime())) {
      return;
    }
    setSelectedWeekStartDate(newDate);
    handleChangeCurrentDate && handleChangeCurrentDate(newDate, calenderType);
  };

  const renderWeekDaysHeader = () => {
    const days = [];
    const startOfWeek = new Date(selectedWeekStartDate);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(
        <th key={i} className="ib__sc__table-th">
          {weekdaysArr[day.getDay()]}<br />
          {day.toLocaleDateString()}
        </th>
      );
    }
    return (
      <tr>
        <th className="ib__sc__table-th">Team</th>
        {days}
      </tr>
    );
  };

  return (
    <div className={'ib__sc__table ib__sc__table-team-wrap ib_sc_type_' + calenderType}>
      <div className="ib__sc__header_wrapper">
        <div className="ib__sc__header">
          <div className="ib__sc__header__date-switch">
            <div className="ib__sc__month-date">
              <div className="ib__sc__month-date-btn-group">
                <button
                  className="ib__sc__month-date__bt-prev ib__sc__np__btn"
                  onClick={() => onWeekChangeNextPrev(-1)}
                >
                  <LeftIcon />
                </button>

                <span className="ib__sc__month-date__bt-text">
                  <input
                    type="date"
                    className="ib__sc-form-control"
                    onChange={selectWeek}
                    value={selectedWeekStartDate.toISOString().substr(0, 10)}
                  />
                </span>

                <button
                  className="ib__sc__month-date__bt-next ib__sc__np__btn"
                  onClick={() => onWeekChangeNextPrev(1)}
                >
                  <RightIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="ib__sc__header__center">
            {calendarHeaderComponent}
          </div>

          <div className="ib__sc__header__right">
            {/* Add any additional header components here */}
            <CalenderSwitch
            calendarSwitchOptions={calendarSwitchOptions}
            
              calenderType={calenderType}
              handleCalendarTypeChange={handleCalendarTypeChange}
            />
          </div>
        </div>
      </div>

      <div className="calendar">
        <table className="ib__sc__table-team" border={0} cellSpacing="0" cellPadding="0">
          <thead>{renderWeekDaysHeader()}</thead>
          <tbody>
            <CalendarTeamListItems
              teams={teams}
              eventsData={events}
              selectedWeekStartDate={selectedWeekStartDate}
              updateEvent={updateEvent}
              calenderToAddOrUpdateEvent={calenderToAddOrUpdateEvent}
              monthCalenderMinCellHeight={30}
                minimumEventThickness={minimumEventThickness}
                boxHeight={30}

              // ... other props
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalendarTeam;
