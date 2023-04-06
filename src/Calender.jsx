import { createContext, useEffect, useRef, useState } from 'react';

// import { DndProvider } from 'react-dnd';
import {
  calculatePositions,
  formatDate,
  isDateBetween,
  parseEvents,
  setEventID,
} from './_utils';

export const EventHandlerContex = createContext();
//const hourBoxHeight = 50;
let boxHeight = 50;
let boxTime = 1; //1 hr
const heightOfWeekColumn = boxHeight * boxTime * 24;

import DayBoxWeek from './DayBoxWeek';

const Calendar = props => {
  const [events, setEvents] = useState(props.events);
  const [placeHolderStyle, setPlaceHolderStyle] = useState({});
  const calanderTableRef = useRef();
  const calanderTBRef = useRef();
  const dragplaceholderRef = useRef();
  //const leftColRef = useRef();
  const [draggingEvent, setDraggingEvent] = useState({});

  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(props.events), 'dd/MM/yyyy', 'HH:mm:ss'),
      ),
    );

    // document.addEventListener('drag', function (e) {
    //   //console.log('drag', e);
    //   // Get the table cell that the cursor is over

    //   // placeholderElement.style.left = tableCell.offsetLeft + 'px';
    //   // placeholderElement.style.top = tableCell.offsetTop + 'px';
    //   // placeholderElement.style.width = tableCell.offsetWidth + 'px';
    //   // placeholderElement.style.height = tableCell.offsetHeight + 'px';
    //   //  }
    // });

    // document.addEventListener('dragend', function (event) {
    //   // Show the original element
    //   var originalElement = document.getElementById(
    //     event.dataTransfer.getData('text'),
    //   );
    //   originalElement.style.display = 'block';
    //   // Show the cursor
    //   document.body.style.cursor = 'auto';
    //   // Hide the placeholder element
    //   var placeholderElement = document.querySelector('.placeholder');
    //   placeholderElement.style.display = 'none';
    // });
  }, [props.events]);

  useEffect(() => {
    //  const daystartTime = new Date(draggingEvent.startTime).setHours(0, 0, 0, 0);
    // const initialTop =
    const height = (boxHeight / boxTime) * draggingEvent.total_event_time;

    document.addEventListener('mousemove', function (e) {
      let element = document.elementFromPoint(e.pageX, e.pageY);

      if (element) {
        // Get the closest td element
        const tableCell = element.closest('.ib-table-hr-box-week');
        const ibCellWeek = element.closest('.ib-cell-week');

        if (tableCell && ibCellWeek) {
          const { top } = ibCellWeek.getBoundingClientRect();
          const { left } = tableCell.getBoundingClientRect();

          var placeholderElement = document.querySelector('.placeholder');
          placeholderElement.style.left = left + 'px';

          if (e.pageY - top - height / 2 > 0) {
            placeholderElement.style.top =
              Math.floor(e.pageY - top + height / 2) + 'px';
          }

          placeholderElement.style.width = tableCell.offsetWidth + 'px';

          placeholderElement.style.height = height + 'px';
        }
      }
    });
  }, [draggingEvent]);
  const dropHandler = e => {
    e.preventDefault();

    const data = e.dataTransfer.getData('text/plain');
    const draggedElement = document.createElement('div');

    draggedElement.innerHTML = data;
    e.target.appendChild(draggedElement);
    // console.log('draggedElement', draggedElement);
    // console.log(e);

    const topDistance = draggedElement.offsetTop;

    console.log(`Distance from top: ${topDistance}px`);

    const new_date = new Date(e.target.getAttribute('data-date'));
    console.log('new_date', new_date);
  };
  const dragOverHandler = e => {
    // console.log('dragOverHandler 444', e.clientX, e.clientY);

    // var tableCell = document.elementFromPoint(e.pageX, e.pageY);
    // console.log('tableCell', tableCell);

    // console.log(tableCell.offsetLeft, tableCell.offsetTop);
    // //if (tableCell && tableCell.tagName.toLowerCase() === 'td') {
    // // Update the position of the placeholder element to be relative to the table cell
    // //  let placeholderElement = dragplaceholderRef.current;
    // placeHolderStyle.left = tableCell.offsetLeft + 'px';
    // placeHolderStyle.top = tableCell.offsetTop + 'px';
    // placeHolderStyle.width = tableCell.offsetWidth + 'px';
    // placeHolderStyle.height = tableCell.offsetHeight + 'px';
    setPlaceHolderStyle(placeHolderStyle);

    // // var tableCell = document.elementFromPoint(event.pageX, event.pageY);
    // // if (tableCell && tableCell.tagName.toLowerCase() === 'td') {
    // //   // Update the position of the placeholder element to be relative to the table cell
    // //   var placeholderElement = document.querySelector('.placeholder');
    // //   placeholderElement.style.left = tableCell.offsetLeft + 'px';
    // //   placeholderElement.style.top = tableCell.offsetTop + 'px';
    // //   placeholderElement.style.width = tableCell.offsetWidth + 'px';
    // //   placeholderElement.style.height = tableCell.offsetHeight + 'px';
    // // }
    e.preventDefault();
  };

  const dragStart = event => {
    console.log('dragStart', event);
    setDraggingEvent(event);
  };

  useEffect(() => {
    calanderTBRef.current.addEventListener('dragover', dragOverHandler);
    calanderTBRef.current.addEventListener('drop', dropHandler, true);
    return () => {
      // calanderTBRef.current.removeEventListener('drop', dropHandler, true);
      // calanderTBRef.current.removeEventListener('dragover', dragOverHandler);
    };
  }, []);

  console.log('calendar events', events);

  return (
    <div>
      <h2>7-Day Calendar</h2>
      <div ref={calanderTableRef} className="ib-table ib-table-week">
        {/* <div style={{ position: 'relative', display: 'flex' }}>
          <div className="left-col" ref={leftColRef}>
            #
          </div>
          {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
            <div key={dayIndex} className="ib-table-th">
              {formatDate(
                new Date(Date.now() + dayIndex * 24 * 60 * 60 * 1000),
                'dd/MMM/yyyy',
              )}
            </div>
          ))}
        </div> */}

        <div
          ref={calanderTBRef}
          style={{ position: 'relative', display: 'flex' }}
        >
          <div
            className="ib-table-tr ib-table-tr-week"
            style={{ position: 'relative', display: 'flex' }}
          >
            <div className="ib-table-td ib-table-td-week"> 00</div>
            {[...Array(7).keys()].map(dayIndex => {
              const now = new Date();
              let boxDay = new Date(
                now.setDate(now.getDate() + dayIndex),
              ).setHours(0, 0, 0, 0);
              //var boxday_string = formatDate(new Date(boxDay), 'dd/MM/yyyy');

              return (
                <div
                  key={dayIndex}
                  className="ib-table-td ib-table-td-week"
                  style={{ height: heightOfWeekColumn + 'px' }}
                >
                  <div key={dayIndex} className="ib-table-th">
                    {formatDate(new Date(boxDay), 'dd/MMM/yyyy')}
                  </div>

                  <EventHandlerContex.Provider value={[dragStart]}>
                    <DayBoxWeek
                      dayIndex={dayIndex}
                      day={boxDay}
                      calanderTableRef={calanderTableRef}
                      boxHeight={boxHeight}
                      draggingEvent2={
                        draggingEvent &&
                        isDateBetween(
                          boxDay,
                          draggingEvent.startTime,
                          draggingEvent.endTime,
                        )
                          ? draggingEvent
                          : null
                      }
                      boxTime={boxTime}
                      boxDay={new Date(boxDay)}
                      updateEvents={events => {
                        setEvents(calculatePositions(events));
                      }}
                      heightOfWeekColumn={heightOfWeekColumn}
                      events={
                        events
                          ? events.filter(event =>
                              isDateBetween(
                                boxDay,
                                event.startTime,
                                event.endTime,
                              ),
                            )
                          : []
                      }
                    />
                  </EventHandlerContex.Provider>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="placeholder"
        ref={dragplaceholderRef}
        style={{ ...placeHolderStyle }}
      >
        55555 + {placeHolderStyle.top}
      </div>
    </div>
  );
};

export default Calendar;
