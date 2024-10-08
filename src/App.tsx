import React from "react";
import { ReactCalendarScheduler } from "./lib";
import { EventObjectInput } from "./lib/type/EventObject";


function App() {
  const events: EventObjectInput[] = [
    {
      title: "Title 1",
      startDate: "20/10/2024",
      endDate: "20/10/2024",
      startTime: "09:00:00",
      endTime: "10:00:00",
      id: 133,
      bg_color: "#FFAB91",
      element: <div>**</div>,
      editable: true,
      userId: 2,
     
      draggable: true,
      resizable: false,
      custom_class: "custom-class",
    },
    {
      title: "Title 2",
      startDate: "10/10/2024",
      endDate: "12/10/2024",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      userId: 2,
     
      draggable: true,
      resizable: true,
    
      element: <div>*</div>,
    },
    {
      title: "Title 3",
      startDate: "10/10/2024",
      endDate: "12/10/2024",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div>*</div>,
    },
    {
      title: "Title 4",
      startDate: "10/10/2024",
      endDate: "12/10/2024",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div>*</div>,
    },
    {
      title: "Title 5",
      startDate: "10/10/2024",
      endDate: "12/10/2024",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div>*</div>,
    },
    {
      title: "Title 6",
      startDate: "10/10/2024",
      endDate: "12/10/2024",
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div>*</div>,
    },

    // Rest of the events...
  ];
  const teams = [
    {
      name: 'Team Alpha',
      userId: 1
    },
    {
      name: 'Team Beta',
      userId: 2
    }
  ];

  React.useEffect(() => { 
    console.log("events", events);
  }, [events]);
  

  return (
    <div className="App" style={{ padding: "4em" }}>

      <ReactCalendarScheduler
        events={events}
        selectedDate={ new Date(new Date().setDate(new Date().getDate() +1 )) }
        calenderType="team" // week or day
        monthCalenderTitleFormate="dddd" //month title formate
        monthCalenderTitle="ddd" //day column title formate
        monthCalenderMinCellHeight={80} //day column title formate
        weekHourBoxHeight={160} //Height of the hour box
        startingWeekday={0} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
        weekCalenderDayStartFromHour={7} // Day start from hour
        weekCalenderVisibleHour={12} //day visible hour
        weekCalenderTitleFormate={(date: Date) => <div>{date.toLocaleDateString('en-US', { weekday: 'short' })} <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div></div> } // correctly formatted function for week day titles
        weekCalenderTimeFormate={12} //day column title formate
        weekCalenderNextBtnDayIncrement={3} //
        showAddNewEventButton={true} //show add new event button
        calendarHeaderComponent={<div>Header</div>} //calendar header component
        teams={teams}
      

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
