import ReactCalnaderScheduler from './ReactCalanderScheduler';

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
      <ReactCalnaderScheduler
        events={events}
        selectedDate={new Date()}
        calanderType="week" // week or day
        monthCalanderTitleFormate="dddd" //month title formate
        monthCalanderTitle="ddd" //day column title formate
        monthCalanderMinCellHeight={50} //day column title formate
        weekHourBoxHeight={50} //Height of the hour box
        startingWeekday={0} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
        weekCalanderDayStartFromHour={7} // Day start from hour
        weekCalanderVisibleHour={12} //day visible hour
        weekCalanderTitleFormate="ddd, MMM dd" //day column title formate
        weekCalanderTimeFormate={12} //day column title formate
        isShowAddNewEventButton={true} //show add new event button
        isShowDeleteEventButton={true} //show delete event button
        isShowAddOrUpadateEventButton={true} //show add or update event button
        disabaleEventPopup={false} //disable event popup
        handleUpdateEvent={event => {
          console.log(event);
          console.log(
            '============================================handleUpdateEvent',
          );
        }}
        handleAddNewEvent={event => {
          console.log(event);
          console.log(
            '============================================handleAddNewEvent',
          );
        }}
        handleDeleteEvent={event => {
          console.log(event);
          console.log(
            '============================================handleDeleteEvent',
          );
        }}
        handleEventClick={event => {
          console.log(event);
          console.log(
            '============================================handleEventClick',
          );
        }}
        handleColumnClick={event => {
          console.log(event);
          console.log(
            '============================================handleColumnClick',
          );
        }}
        handleNextClick={type => {
          console.log(
            '============================================handleNextClick',
          );
          console.log(type);
        }}
        handlePrevClick={type => {
          console.log(type);
          console.log(
            '============================================handlePrevClick',
          );
        }}
        handleClanderTypeChange={type => {
          console.log(type);
          console.log(
            '============================================handleClanderTypeChange',
          );
        }}
      />
    </div>
  );
}

export default App;
