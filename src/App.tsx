import React from "react";
import { ReactCalendarScheduler } from "./lib";
import { EventObjectInput } from "./lib/type/EventObject";


function App() {
const getFormattedDate = (date: Date | number) => {
  const newDate = new Date(date);
  //dd/mm/yyyy
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
}

//new Date(new Date().setDate(new Date().getDate() +1 ))

  const events: EventObjectInput[] = [
    {
      title: "Title Lorem Ipsum ",
      startDate: "20/10/2024",
      endDate: "20/10/2024",
      startTime: "09:00:00",
      endTime: "10:00:00",
      id: 133,
      bg_color: "#FFAB91",
      element: <div>
        Description of the event
      </div>,
      editable: true,
      userId: 2,
     
      draggable: true,
      resizable: false,
      custom_class: "custom-class",
    },
    {
      title: "Title 2",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()-5 ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()-3 ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5cc077",
      userId: 2,
     
      draggable: true,
      resizable: true,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 3",
      startDate:getFormattedDate(new Date(new Date().setDate(new Date().getDate() ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate() ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#5c6bc0",
      userId: 1,
     
      draggable: true,
      resizable: true,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 4",
      startDate:getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate() ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#c05caf",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 5",
      startDate:  getFormattedDate(new Date(new Date().setDate(new Date().getDate() ))), 
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate() ))),
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
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 2,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },
    {
      title: "Title 6",
      startDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      endDate: getFormattedDate(new Date(new Date().setDate(new Date().getDate()  ))),
      startTime: "08:30:00",
      endTime: "12:00:00",
      id: 3,
      bg_color: "#ffa946",
      userId: 1,
     
      draggable: true,
      resizable: false,
    
      element: <div> Description of the event</div>,
    },


    // Rest of the events...
  ];
  const teams = [
    {
      name: 'Team Alpha',
      userId: 1,
      image:"https://picsum.photos/32",
      profileComponent: <div>Profile</div>

    },
    {
      name: 'Team Beta',
      userId: 2,
      image:"https://picsum.photos/32/34",
      profileComponent: <div>Profile</div>

    },
    {
      name: 'Team Beta',
      userId: 3,
      image:"https://picsum.photos/32/33",
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
        monthViewMinCellHeight={100} //day column title formate
        weekHourCellHeight={160} //Height of the hour box
        startingWeekday={0} // 0 for sunday, 1 for monday, 2 for tuesday, 3 for wednesday, 4 for thursday, 5 for friday, 6 for saturday
        weekViewStartHour={7} // Day start from hour
        weekViewVisibleHours={12} //day visible hour
        weekViewDayTitleFormat={(date: Date) => <div>{date.toLocaleDateString('en-US', { weekday: 'short' })} <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div></div> } // correctly formatted function for week day titles
        weekViewTimeFormat={12} //day column title formate
        weekViewNextButtonDayIncrement={3} //
        minimumEventHeight={40} //minimum event thickness
        minimumEventWidth={100} //minimum event width
        showAddNewEventButton={true} //show add new event button
        calendarHeader={<div>Header</div>} //calendar header component
        onDateChange={(date) => {
          console.log(date);
          console.log("onDateChange");
        }}
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
