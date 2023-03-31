import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { calculatePositions, formatDate, parseEvents } from './_utils';
//const hourBoxHeight = 50;
let boxHeight = 50;
let boxTime = 1; //1 hr
const heightOfWeekColumn = boxHeight * boxTime * 24;

import Box from './Box';

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
            <tr className="ib-table-tr">
              <td className="ib-table-td"> 00</td>
              {[...Array(7).keys()].map(dayIndex => {
                const now = new Date();
                var boxDay = new Date(
                  now.setDate(now.getDate() + dayIndex),
                ).setHours(0, 0, 0, 0);
                var boxday_string = formatDate(new Date(boxDay), 'dd/MM/yyyy');

                return (
                  <td
                    key={dayIndex}
                    className="ib-table-td"
                    style={{ height: heightOfWeekColumn + 'px' }}
                  >
                    <Box
                      dayIndex={dayIndex}
                      day={boxDay}
                      boxHeight={boxHeight}
                      boxTime={boxTime}
                      heightOfWeekColumn={heightOfWeekColumn}
                      events={
                        events
                          ? events.filter(
                              event => event.mid_day_string === boxday_string,
                            )
                          : []
                      }
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default Calendar;
