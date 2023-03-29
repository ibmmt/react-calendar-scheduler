import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { calculatePositions, formatDate, parseEvents } from './_utils';

import Box from './Box';
function isDateBetween(dateString, startDateString, endDateString) {
  const date = new Date(dateString);
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  // console.log('date==========',date,'startDate',startDate,'endDate',endDate)

  return date >= startDate && date <= endDate;
}

const Calendar = props => {
  const [events, setEvents] = useState(props.events);
  useEffect(() => {
    setEvents(
      calculatePositions(parseEvents(props.events, 'dd/MM/yyyy', 'HH:mm:ss')),
    );
  }, [props.events]);

  console.log('calendar events', events);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>7-Day Calendar</h2>
        <table className="ib-table">
          <thead>
            <tr>
              <th></th>
              {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                <th key={dayIndex} className="ib-table-th">
                  {formatDate(
                    new Date(Date.now() + dayIndex * 24 * 60 * 60 * 1000),
                    'dd/MMM/yyyy',
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(25).keys()].map(hour => {
              return (
                <tr key={hour} className="ib-table-tr">
                  <td className="ib-table-td">{hour}:00</td>
                  {[...Array(7).keys()].map(dayIndex => {
                    const now = new Date();
                    var boxDay = new Date(
                      now.setDate(now.getDate() + dayIndex),
                    ).setHours(0, 0, 0, 0);
                    var boxday_string = formatDate(
                      new Date(boxDay),
                      'dd/MM/yyyy',
                    );
                    let boxStartTime = new Date(boxDay).setHours(hour, 0, 0, 0);
                    let boxEndTime = new Date(boxDay).setHours(
                      hour + 1,
                      0,
                      0,
                      0,
                    );
                    //   console.log(boxday_string,events[0].mid_day_string)
                    // console.log('boxStartTime',boxStartTime,'boxEndTime',boxEndTime,boxday_string)
                    if (boxday_string === events[0].mid_day_string) {
                      console.log(boxday_string);
                    }
                    return (
                      <td
                        key={dayIndex}
                        className="ib-table-td"
                        style={{ height: '50px' }}
                      >
                        <Box
                          dayIndex={dayIndex}
                          startHour={hour}
                          day={boxDay}
                          boxStartTime={boxStartTime}
                          boxEndTime={boxEndTime}
                          events={events.filter(
                            event =>
                              event.mid_day_string === boxday_string &&
                              isDateBetween(
                                event.mid,
                                boxStartTime,
                                boxEndTime,
                              ),
                          )}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default Calendar;
