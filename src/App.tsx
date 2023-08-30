import React from "react";
import { ReactCalendarScheduler } from "./lib";
import { EventObjectInput } from "./lib/type/EventObject";


function App() {
  const events: EventObjectInput[] = [
    {
      title: "178",
      startDate: "12/06/2023",
      endDate: "12/06/2023",
      startTime: "08:30:00",
      endTime: "09:00:00",
      id: 133,
      bg_color: "#FFAB91",
      element: <div>**</div>,
      editable: true,
      deletable: true,
      draggable: true,
      custom_class: "custom-class",
    },
    {
      title: "2",
      startDate: "12/06/2023",
      endDate: "12/06/2023",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
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
        isShowAddNewEventButton={true} //show add new event button

        disabaleEventPopup={false} //disable event popup
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
        handleClanderTypeChange={(type) => {
          console.log(type);
          console.log("handleClanderTypeChange");
        }}
      />
    </div>
  );
}

export default App;
