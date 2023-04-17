import ReactCalnaderScedular from './ReactCalanderScedule';

function App() {
  const events = [
    {
      title: '144',
      startDate: '20/04/2023',
      endDate: '20/04/2023',
      startTime: '08:30:00',
      endTime: '09:00:00',
      id: 133,
      bg_color: '#FFAB91',
    },
    {
      title: '2',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '08:30:00',
      endTime: '12:00:00',
      id: 2,
      bg_color: '#5c6bc0',
    },

    {
      title: '4',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '10:30:00',
      endTime: '14:00:00',
      id: 23,
      bg_color: '#5c6bc0',
    },
    {
      title: '5',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '14:30:00',
      endTime: '18:00:00',
      id: 3,
      bg_color: '#5c6bc0',
    },
    // {
    //   title: '5.5',
    //   startDate: '22/04/2023',
    //   endDate: '22/04/2023',
    //   startTime: '06:30:00',
    //   endTime: '07:00:00',
    //   id: 22,
    // },
    {
      title: '6',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '11:30:00',
      endTime: '12:00:00',
      id: 4,
      bg_color: '#FFAB91',
    },
    {
      title: '7',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '11:00:00',
      endTime: '15:00:00',
      id: 55,
      bg_color: '#FFAB91',
    },

    {
      title: '8',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '13:30:00',
      endTime: '16:00:00',
      id: 8,
      bg_color: '#FFAB91',
    },
    {
      title: '9',
      startDate: '22/04/2023',
      endDate: '22/04/2023',
      startTime: '12:30:00',
      endTime: '16:00:00',
      id: 11,
      bg_color: '#FFAB91',
    },
    {
      title: '92',
      startDate: '17/04/2023',
      endDate: '17/04/2023',
      startTime: '07:30:00',
      endTime: '17:00:00',
      id: 13,
      bg_color: '#FFAB91',
    },
  ];

  return (
    <div className="App" style={{ padding: '4em' }}>
      <ReactCalnaderScedular
        events={events}
        currentDay={new Date()}
        fromDate={new Date()}
        weekHourBoxHeight={50}
        dayStartingFrom={7} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
        handleUpdateEvent={event => {
          console.log(event);
        }}
        handleAddNewEvent={event => {
          console.log(event);
        }}
        handleDeleteEvent={event => {
          console.log(event);
        }}
        hendleEventClick={event => {
          console.log(event);
        }}
        handleColumnClick={event => {
          console.log(event);
        }}
        handleNextClick={type => {
          console.log(type);
        }}
        handlePrevClick={type => {
          console.log(type);
        }}
        handleClanderTypeChange={type => {
          console.log(type);
        }}
        monthCalanderTitleFormate="dddd" //month title formate
        calanderType="week" // week or day
        scrollableHour={7} //scrollable hours
        dayStartFromHour={7} //day start from hour,
        dayColumnWeekTitleFormate="ddd, MMM DD" //day column title formate
        dayColumnDayTitleFormate="ddd" //day column title formate
        dayColumnTimeTitleFormate="hh:mm A" //day column title formate
        isShowAddNewEventButton={true} //show add new event button
        isShowDeleteEventButton={true} //show delete event button
        isShowAddOrUpadateEventButton={true} //show add or update event button
      />
    </div>
  );
}

export default App;
