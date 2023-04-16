import ReactCalnaderScedular from './ReactCalanderScedule';

function App() {
  const events = [
    {
      title: '1',
      startDate: '21/04/2023',
      endDate: '21/04/2023',
      startTime: '08:30:00',
      endTime: '09:00:00',
      id: 1,
      bg_color: '#FFAB91',
    },
    {
      title: '2',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
      startTime: '08:30:00',
      endTime: '12:00:00',
      id: 2,
      bg_color: '#5c6bc0',
    },

    {
      title: '4',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
      startTime: '10:30:00',
      endTime: '14:00:00',
      id: 23,
      bg_color: '#5c6bc0',
    },
    {
      title: '5',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
      startTime: '14:30:00',
      endTime: '18:00:00',
      id: 3,
      bg_color: '#5c6bc0',
    },
    // {
    //   title: '5.5',
    //   startDate: '15/04/2023',
    //   endDate: '15/04/2023',
    //   startTime: '06:30:00',
    //   endTime: '07:00:00',
    //   id: 22,
    // },
    {
      title: '6',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
      startTime: '11:30:00',
      endTime: '12:00:00',
      id: 4,
      bg_color: '#FFAB91',
    },
    {
      title: '7',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
      startTime: '11:00:00',
      endTime: '15:00:00',
      id: 55,
      bg_color: '#FFAB91',
    },

    {
      title: '8',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
      startTime: '13:30:00',
      endTime: '16:00:00',
      id: 8,
      bg_color: '#FFAB91',
    },
    {
      title: '9',
      startDate: '15/04/2023',
      endDate: '15/04/2023',
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
    <div className="App">
      <ReactCalnaderScedular events={events} />
    </div>
  );
}

export default App;
