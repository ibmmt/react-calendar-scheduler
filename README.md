# React Calendar Scheduler

React Calendar Scheduler is a flexible and customizable calendar component for scheduling events in React applications.

## Features

- Supports week and month views for calendar scheduling.
- Drag and drop functionality for event placement and resizing.
- Customizable event rendering and styling.
- Easily add, update, and delete events.
- Responsive design for mobile and desktop devices.

## Installation

You can install the React Calendar Scheduler package using npm or yarn.

Using npm:

```

npm install react-calendar-scheduler

```

Using yarn:

```

yarn add react-calendar-scheduler

```

Once installed, you can import the component in your React application and start using it.

## Usage

Import the `ReactCalendarScheduler` component and use it in your React application:

```jsx
import { ReactCalendarScheduler } from 'react-calendar-scheduler';

function App() {
  // Define your event data
  const events = [
    // Event objects
  ];

  return (
    <div>
      <h1>React Calendar Scheduler</h1>
      <ReactCalendarScheduler
        events={events}
        // Other props
      />
    </div>
  );
}

export default App;
```

```
const event = {
 {
  "title": "Meeting with Team",
  "startDate": "15/04/2024",// dd/MM/yyy
  "endDate": "15/04/2024", // dd/MM/yyy
  "startTime": "10:00:00",
  "endTime": "11:00:00",
  "bg_color": "#EA4D4D"
  "draggable":true

}
};
```

## Props

| Name                              | Description                                                                                     | Default Value   |
| --------------------------------- | ----------------------------------------------------------------------------------------------- | --------------- |
| `selectedDate`                    | The initial selected date for the calendar. Defaults to the current date.                       | Current date    |
| `calendarType`                    | The type of calendar to display. Can be `'week'` or `'month'`.                                  | `'week'`        |
| `monthCalenderTitleFormate`       | The format for the month calendar title. Defaults to `'dddd'`.                                  | `'dddd'`        |
| `monthCalenderTitle`              | The format for the day column title in the month calendar. Defaults to `'ddd'`.                 | `'ddd'`         |
| `monthCalenderDayHeight`          | The height of each day column in the month calendar. Defaults to `120`.                         | `120`           |
| `minimumEventThickness`           | The minimum thickness for event rendering. Defaults to `30`.                                    | `30`            |
| `weekHourBoxHeight`               | The height of each hour box in the week calendar. Defaults to `50`.                             | `50`            |
| `weekCalenderNextBtnDayIncrement` | The number of days to increment on the next button click in the week calendar. Defaults to `7`. | `7`             |
| `startingWeekday`                 | The starting weekday for the week calendar. 0 for Sunday, 1 for Monday, and so on.              | `1`             |
| `weekCalenderDayStartFromHour`    | The starting hour for each day in the week calendar. Defaults to `7`.                           | `7`             |
| `weekCalenderVisibleHour`         | The number of visible hours in each day of the week calendar. Defaults to `12`.                 | `12`            |
| `weekCalenderTitleFormate`        | The format for the day column title in the week calendar. Defaults to `'ddd, MMM dd'`.          | `'ddd, MMM dd'` |
| `weekCalenderTimeFormate`         | The format for the time display in the week calendar. Defaults to `12`.                         | `12`            |
| `monthCalenderMinCellHeight`      | The minimum height of each cell in the month calendar. Defaults to `50`.                        | `50`            |
| `disableEventPopup`               | Disables the event popup if set to `true`. Defaults to `false`.                                 | `false`         |
| `disableAddEventPopup`            | Disables the add event popup if set to `true`. Defaults to `false`.                             | `false`         |
| `handleUpdateEvent`               | Callback function for updating an event.                                                        |                 |
| `handleAddNewEvent`               | Callback function for adding a new event.                                                       |                 |

Props
selectedDate (optional): The initial selected date for the calendar. Defaults to the current date.
calendarType (optional): The type of calendar to display. Can be 'week' or 'month'. Defaults to 'week'.
// Other props and their descriptions

## Contributing

Contributions, bug reports, and feature requests are welcome. Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/your-username/your-package).

## License

This project is licensed under the [MIT License](LICENSE).

```

```
