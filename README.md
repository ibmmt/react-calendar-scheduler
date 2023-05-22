




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

npm install react-calendar-scheduler

mathematica
Copy code

Using yarn:

yarn add react-calendar-scheduler

arduino
Copy code

Once installed, you can import the component in your React application and start using it.

## Usage

Import the `ReactCalnaderScheduler` component and use it in your React application:

````jsx
import ReactCalnaderScheduler from 'react-calendar-scheduler';
import 'react-calendar-scheduler/dist/index.css';

function App() {
  // Define your event data
  const events = [
    // Event objects
  ];

  return (
    <div>
      <h1>React Calendar Scheduler</h1>
      <ReactCalnaderScheduler
        events={events}
        // Other props
      />
    </div>
  );
}


Certainly! Here's an updated version of the README file with documentation for each function:

```markdown
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

````

npm install react-calendar-scheduler

```

Using yarn:

```

yarn add react-calendar-scheduler

````

Once installed, you can import the component in your React application and start using it.

## Usage

Import the `ReactCalnaderScheduler` component and use it in your React application:

```jsx
import ReactCalnaderScheduler from 'react-calendar-scheduler';
import 'react-calendar-scheduler/dist/index.css';

function App() {
  // Define your event data
  const events = [
    // Event objects
  ];

  return (
    <div>
      <h1>React Calendar Scheduler</h1>
      <ReactCalnaderScheduler
        events={events}
        // Other props
      />
    </div>
  );
}

export default App;
````

## Props

- `selectedDate` (optional): The initial selected date for the calendar. Defaults to the current date.
- `calendarType` (optional): The type of calendar to display. Can be `'week'` or `'month'`. Defaults to `'week'`.
- `monthCalanderTitleFormate` (optional): The format for the month calendar title. Defaults to `'dddd'`.
- `monthCalanderTitle` (optional): The format for the day column title in the month calendar. Defaults to `'ddd'`.
- `monthCalanderDayHeight` (optional): The height of each day column in the month calendar. Defaults to `120`.
- `minimumEventThickness` (optional): The minimum thickness for event rendering. Defaults to `30`.
- `weekHourBoxHeight` (optional): The height of each hour box in the week calendar. Defaults to `50`.
- `weekCalanderNextBtnDayIncrement` (optional): The number of days to increment on the next button click in the week calendar. Defaults to `7`.
- `startingWeekday` (optional): The starting weekday for the week calendar. 0 for Sunday, 1 for Monday, and so on. Defaults to `1`.
- `weekCalanderDayStartFromHour` (optional): The starting hour for each day in the week calendar. Defaults to `7`.
- `weekCalanderVisibleHour` (optional): The number of visible hours in each day of the week calendar. Defaults to `12`.
- `weekCalanderTitleFormate` (optional): The format for the day column title in the week calendar. Defaults to `'ddd, MMM dd'`.
- `weekCalanderTimeFormate` (optional): The format for the time display in the week calendar. Defaults to `12`.
- `monthCalanderMinCellHeight` (optional): The minimum height of each cell in the month calendar. Defaults to `50`.
- `disabaleEventPopup` (optional): Disables the event popup if set to `true`. Defaults to `false`.
- `disabaleAddEventPopup` (optional): Disables the add event popup if set to `true`. Defaults to `false`.
- `handleUpdateEvent` (optional): Callback function for updating an event.
- `handleAddNewEvent` (optional): Callback function for adding a new
  export default App;
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
