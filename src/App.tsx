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
      userId: 2,
      profileComponent: <div>Profile</div>

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
        calendarType="team" // week or day
        monthViewDayTitleFormat="short" //month title formate
      
        monthViewMinCellHeight={80} //day column title formate
        weekHourCellHeight={160} //Height of the hour box
        startingWeekday={0} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
        weekViewStartHour={7} // Day start from hour
        weekViewVisibleHours={12} //day visible hour
        weekViewDayTitleFormat={(date: Date) => <div>{date.toLocaleDateString('en-US', { weekday: 'short' })} <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div></div> } // correctly formatted function for week day titles
        weekViewTimeFormat={12} //day column title formate
        weekViewNextButtonDayIncrement={3} //
        showAddNewEventButton={true} //show add new event button
        calendarHeader={<div>Header</div>} //calendar header component
        teams={teams}
      

        disableEventModal={false} //disable event modal
        onUpdateEvent={(event) => {
          console.log(event);
          console.log("onUpdateEvent");
        }}
        onAddEvent={(event) => {
          console.log(event);
          console.log("onAddEvent");
        }}
        onDeleteEvent={(event) => {
          console.log(event);
          console.log("onDeleteEvent");
        }}
        onEventClick={(event) => {
          console.log(event);
          console.log("onEventClick");
        }}
        onColumnClick={(event) => {
          console.log(event);
          console.log("onColumnClick");
        }}
        onNextClick={() => {
          console.log("onNextClick");
      
        }}
        onPrevClick={() => {
      
          console.log("onPrevClick");
        }}
        onCalendarTypeChange={(type) => {
          console.log(type);
          console.log("onCalendarTypeChange");
        }}
      />
    </div>
  );
}

export default App;
