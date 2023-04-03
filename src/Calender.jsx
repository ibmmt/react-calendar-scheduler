import { useEffect, useRef, useState } from 'react';
// import { DndProvider } from 'react-dnd';
import {
  calculatePositions,
  formatDate,
  parseEvents,
  setEventID,
} from './_utils';
//const hourBoxHeight = 50;
let boxHeight = 50;
let boxTime = 1; //1 hr
const heightOfWeekColumn = boxHeight * boxTime * 24;

import DayBoxWeek from './DayBoxWeek';

const Calendar = props => {
  const [events, setEvents] = useState(props.events);
  const calanderTableRef = useRef();
  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(props.events), 'dd/MM/yyyy', 'HH:mm:ss'),
      ),
    );
  }, [props.events]);

  console.log('calendar events', events);

  return (
    <div>
      <h2>7-Day Calendar</h2>
      <table ref={calanderTableRef} className="ib-table ib-table-week">
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
          <tr className="ib-table-tr ib-table-tr-week">
            <td className="ib-table-td ib-table-td-week"> 00</td>
            {[...Array(7).keys()].map(dayIndex => {
              const now = new Date();
              var boxDay = new Date(
                now.setDate(now.getDate() + dayIndex),
              ).setHours(0, 0, 0, 0);
              var boxday_string = formatDate(new Date(boxDay), 'dd/MM/yyyy');

              return (
                <td
                  key={dayIndex}
                  className="ib-table-td ib-table-td-week"
                  style={{ height: heightOfWeekColumn + 'px' }}
                >
                  <DayBoxWeek
                    dayIndex={dayIndex}
                    day={boxDay}
                    calanderTableRef={calanderTableRef}
                    boxHeight={boxHeight}
                    boxTime={boxTime}
                    boxDay={boxday_string}
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
  );
};

export default Calendar;
