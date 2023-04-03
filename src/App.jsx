import Calendar from './Calender';

function App() {
  let events = [
    {
      title: '1',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '01:30:00',
      endTime: '03:00:00',
      id: 1,
    },
    {
      title: '2',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '02:30:00',
      endTime: '05:00:00',
      id: 2,
    },

    {
      title: '4',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '02:30:00',
      endTime: '05:00:00',
      id: 23,
    },
    {
      title: '5',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '05:30:00',
      endTime: '07:00:00',
      id: 3,
    },
    // {
    //   title: '5.5',
    //   startDate: '04/04/2023',
    //   endDate: '04/04/2023',
    //   startTime: '06:30:00',
    //   endTime: '07:00:00',
    //   id: 22,
    // },
    {
      title: '6',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '05:30:00',
      endTime: '07:00:00',
      id: 4,
    },
    {
      title: '7',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '06:00:00',
      endTime: '08:00:00',
      id: 55,
    },

    {
      title: '8',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '10:30:00',
      endTime: '12:00:00',
      id: 8,
    },
    {
      title: '9',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '10:30:00',
      endTime: '12:00:00',
      id: 11,
    },
    {
      title: '92',
      startDate: '04/04/2023',
      endDate: '04/04/2023',
      startTime: '10:30:00',
      endTime: '12:00:00',
      id: 13,
    },
  ];

  events = events.splice(0, 1);
  return (
    <div className="App">
      <div className="container">
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default App;
