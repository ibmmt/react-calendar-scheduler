# React Calendar Scheduler

**React Calendar Scheduler** is a customizable and flexible calendar component for React applications. It supports multiple views including week, month, day, and team-based scheduling, making it ideal for managing tasks, events, and team shifts.

## Features

- **Multiple views**: Switch between `week`, `day`, `month`, and `team` views for effective scheduling.
- **Drag-and-drop functionality**: Easily move, resize, and edit events.
- **Customizable event rendering**: Create your own event elements with full control over styles.
- **Responsive design**: Works seamlessly on both desktop and mobile devices.
- **Team-based view**: Assign events to teams or users and display team-specific schedules.
- **Shift scheduling**: Manage user shifts and assign events to specific time slots.

## Installation

Install the package using npm or yarn:

```bash
npm install react-calendar-scheduler
```

or

```bash
yarn add react-calendar-scheduler
```

## Usage

To use the component, import `ReactCalendarScheduler` into your project and pass in the required props like events and teams.

```jsx
import ReactCalendarScheduler from 'react-calendar-scheduler';

function App() {
  const events = [
    {
      title: 'Morning Shift',
      startDate: '20/10/2024',
      endDate: '20/10/2024',
      startTime: '09:00:00',
      endTime: '10:00:00',
      id: 133,
      bg_color: '#FFAB91',
      userId: 2,
      draggable: true,
      resizable: false,
    },
    {
      title: 'Afternoon Shift',
      startDate: '10/10/2024',
      endDate: '10/10/2024',
      startTime: '12:00:00',
      endTime: '16:00:00',
      id: 134,
      bg_color: '#5c6bc0',
      userId: 1,
      draggable: true,
      resizable: true,
    },
    // Additional events here
  ];

  const teams = [
    {
      name: 'Team Alpha',
      userId: 1,
      profileComponent: <div>Alpha Profile</div>,
    },
    {
      name: 'Team Beta',
      userId: 2,
      profileComponent: <div>Beta Profile</div>,
    },
  ];

  return (
    <div style={{ padding: '4em' }}>
      <ReactCalendarScheduler
        events={events}
        selectedDate={new Date()}
        calendarType="team"
        teams={teams}
        monthViewDayTitleFormat="short"
        weekHourCellHeight={160}
        startingWeekday={0} // 0 for Sunday
        weekViewStartHour={7} // Day starts from 7 AM
        weekViewVisibleHours={12} // Show 12 hours in week view
        showAddNewEventButton={true}
        onUpdateEvent={event => console.log('Event Updated:', event)}
        onAddEvent={event => console.log('New Event Added:', event)}
        onDeleteEvent={event => console.log('Event Deleted:', event)}
        onEventClick={event => console.log('Event Clicked:', event)}
        onNextClick={() => console.log('Next Click')}
        onPrevClick={() => console.log('Prev Click')}
        onCalendarTypeChange={type =>
          console.log('Calendar Type Changed:', type)
        }
      />
    </div>
  );
}

export default App;
```

## Props

Here are the key props supported by the `ReactCalendarScheduler` component:

| Name                             | Description                                                                                                                           | Default Value                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `selectedDate`                   | The initially selected date for the calendar. Defaults to the current date.                                                           | `new Date()`                       |
| `calendarType`                   | The type of calendar view. Can be `'week'`, `'day'`, `'month'`, or `'team'`.                                                          | `'week'`                           |
| `monthViewDayTitleFormat`        | Format for day titles in the month view. Can be `'long'`, `'short'`, or a custom function.                                            | `'short'`                          |
| `monthViewDayHeight`             | The height of each day column in the month calendar (in pixels).                                                                      | `120`                              |
| `minimumEventHeight`             | Minimum height of events (in pixels).                                                                                                 | `30`                               |
| `calendarHeight`                 | Total height of the calendar (in pixels).                                                                                             | `600`                              |
| `weekHourCellHeight`             | Height of each hour cell in the week view (in pixels).                                                                                | `50`                               |
| `weekViewNextButtonDayIncrement` | Number of days to increment on the next button click in week view.                                                                    | `7`                                |
| `startingWeekday`                | Starting weekday for the calendar: `0` for Sunday, `1` for Monday, etc.                                                               | `1`                                |
| `weekViewStartHour`              | Starting hour for each day in week view (24-hour format).                                                                             | `7`                                |
| `weekViewVisibleHours`           | Number of visible hours per day in week view.                                                                                         | `12`                               |
| `weekViewDayTitleFormat`         | Format for the day titles in week view. Can be a string (`'ddd, MMM dd'`) or a custom function.                                       | `'ddd, MMM dd'`                    |
| `weekViewTimeFormat`             | Time format for week view. Can be `12` or `24` for 12-hour or 24-hour formats.                                                        | `12`                               |
| `monthViewMinCellHeight`         | Minimum height of each cell in the month view (in pixels).                                                                            | `50`                               |
| `disableEventModal`              | Disable event modals if set to `true`.                                                                                                | `false`                            |
| `disableAddEventModal`           | Disable the "Add Event" modal if set to `true`.                                                                                       | `false`                            |
| `showAddNewEventButton`          | Show or hide the "Add New Event" button.                                                                                              | `true`                             |
| `calendarHeader`                 | Custom JSX for the calendar header.                                                                                                   | `null`                             |
| `onUpdateEvent`                  | Callback function to handle event updates.                                                                                            | `null`                             |
| `onAddEvent`                     | Callback function to handle adding new events.                                                                                        | `null`                             |
| `onDeleteEvent`                  | Callback function to handle event deletions.                                                                                          | `null`                             |
| `onEventClick`                   | Callback function for event click actions.                                                                                            | `null`                             |
| `onColumnClick`                  | Callback function for column click actions (e.g., when clicking on an empty time slot).                                               | `null`                             |
| `onNextClick`                    | Callback function for clicking the "Next" button.                                                                                     | `null`                             |
| `onPrevClick`                    | Callback function for clicking the "Prev" button.                                                                                     | `null`                             |
| `onCalendarTypeChange`           | Callback function to handle changes in the calendar type (`week`, `day`, `month`, `team`).                                            | `null`                             |
| `onDateChange`                   | Callback function to handle the change in the current date.                                                                           | `null`                             |
| `onIncreaseTimeSpan`             | Callback function to increase the visible time span in week view.                                                                     | `null`                             |
| `events`                         | Array of event objects to be displayed in the calendar. Each event should include `userId`, `startDate`, `endDate`, `startTime`, etc. | `[]`                               |
| `teams`                          | Array of team objects. Each team includes a `name`, `userId`, and optionally a `profileComponent`.                                    | `[]`                               |
| `calendarViewOptions`            | Array of available calendar views. Default options are `['week', 'day', 'month', 'team']`.                                            | `['week', 'day', 'month', 'team']` |

---

### Example Usage

```jsx
<ReactCalendarScheduler
  events={events}
  selectedDate={new Date()}
  calendarType="week"
  monthViewDayHeight={120}
  weekHourCellHeight={50}
  weekViewStartHour={7}
  weekViewVisibleHours={12}
  disableEventModal={false}
  onUpdateEvent={handleEventUpdate}
  teams={teams}
  calendarViewOptions={['week', 'day', 'month', 'team']}
/>
```

                                                             | `true`        |

## Team-Based Scheduling

To enable **team-based scheduling**, make sure you set the `calendarType` prop to `"team"` and pass the `teams` array, where each team has a unique `userId` and optionally a `profileComponent` to display user information. The `events` array should have events linked to `userId` values.

### Example Team Data:

```js
const teams = [
  {
    name: 'Team Alpha',
    userId: 1,
    profileComponent: <div>Profile for Team Alpha</div>,
  },
  {
    name: 'Team Beta',
    userId: 2,
    profileComponent: <div>Profile for Team Beta</div>,
  },
];
```

### Example Event Data:

```js
const events = [
  {
    title: 'Morning Shift',
    startDate: '20/10/2024',
    endDate: '20/10/2024',
    startTime: '09:00:00',
    endTime: '10:00:00',
    userId: 2, // Assigned to Team Beta
    bg_color: '#FFAB91',
    draggable: true,
    resizable: false,
  },
  {
    title: 'Afternoon Shift',
    startDate: '10/10/2024',
    endDate: '10/10/2024',
    startTime: '12:00:00',
    endTime: '16:00:00',
    userId: 1, // Assigned to Team Alpha
    bg_color: '#5c6bc0',
    draggable: true,
    resizable: true,
  },
];
```

By passing this data, the **team view** will display a list of teams and their assigned events, allowing you to manage shifts and schedules for different users.

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/your-username/react-calendar-scheduler).

## License

This project is licensed under the [MIT License](LICENSE).
