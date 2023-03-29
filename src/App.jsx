import Calendar from './Calender';

function App() {
  const events = [
    {
      title: '1',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '01:30:00',
      endTime: '03:00:00',
      id: 1,
    },
    {
      title: '2',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '02:30:00',
      endTime: '06:00:00',
      id: 2,
    },
    {
      title: '3',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '06:30:00',
      endTime: '07:00:00',
      id: 22,
    },
    {
      title: '4',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '02:30:00',
      endTime: '06:00:00',
      id: 23,
    },
    {
      title: '5',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '05:31:00',
      endTime: '07:00:00',
      id: 3,
    },
    {
      title: '6',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '05:31:00',
      endTime: '07:00:00',
      id: 4,
    },
    {
      title: '7',
      startDate: '30/03/2023',
      endDate: '30/03/2023',
      startTime: '05:30:00',
      endTime: '08:00:00',
      id: 5,
    },
  ];

  return (
    <div className="App">
      <div className="container">
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default App;
