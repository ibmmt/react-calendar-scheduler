import React from "react";
import { ReactCalendarScheduler } from "./lib";
import { EventObjectInput } from "./lib/type/EventObject";


function App() {
  const events: EventObjectInput[] = [
    {
      title: "Title 4",
      startDate: "12/08/2024",
      endDate: "12/08/2024",
      startTime: "08:30:00",
      endTime: "09:00:00",
      id: 133,
      bg_color: "#FFAB91",
      element: <div>**</div>,
      editable: true,
    
      draggable: false,
      custom_class: "custom-class",
    },
    {
      title: "Title 2",
      startDate: "12/08/2024",
      endDate: "12/08/2024",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      draggable: false,
      element: <div>*</div>,
    }
    // Rest of the events...
  ];

  React.useEffect(() => { 
    console.log("events", events);
  }, [events]);
  

  return (
    <div className="App" style={{ padding: "4em" }}>

      <ReactCalendarScheduler
        events={events}
        selectedDate={new Date()}
        calenderType="month" // week or day
        monthCalenderTitleFormate="dddd" //month title formate
        monthCalenderTitle="ddd" //day column title formate
        monthCalenderMinCellHeight={80} //day column title formate
        weekHourBoxHeight={160} //Height of the hour box
        startingWeekday={0} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
        weekCalenderDayStartFromHour={7} // Day start from hour
        weekCalenderVisibleHour={12} //day visible hour
        weekCalenderTitleFormate="ddd, MMM dd" //day column title formate
        weekCalenderTimeFormate={12} //day column title formate
        weekCalenderNextBtnDayIncrement={3} //
        showAddNewEventButton={true} //show add new event button

        disableEventModal={false} //disable event modal
        handleUpdateEvent={(event) => {
          console.log(event);
          console.log("handleUpdateEvent");
        }}
        handleAddNewEvent={(event) => {
          console.log(event);
          console.log("handleAddNewEvent");
        }}
        handleDeleteEvent={(event) => {
          console.log(event);
          console.log("handleDeleteEvent");
        }}
        handleEventClick={(event) => {
          console.log(event);
          console.log("handleEventClick");
        }}
        handleColumnClick={(event) => {
          console.log(event);
          console.log("handleColumnClick");
        }}
        handleNextClick={() => {
          console.log("handleNextClick");
      
        }}
        handlePrevClick={() => {
      
          console.log("handlePrevClick");
        }}
        handleCalendarTypeChange={(type) => {
          console.log(type);
          console.log("handleCalendarTypeChange");
        }}
      />
    </div>
  );
}

export default App;
