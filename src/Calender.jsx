import { createContext, useEffect, useRef, useState } from 'react';

// import { DndProvider } from 'react-dnd';
import {
  calculatePositions,
  formatDate,
  getDaysDifference,
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
  //const [placeHolderStyle, setPlaceHolderStyle] = useState({});
  const calanderTableRef = useRef();
  const calanderTBRef = useRef();
  const lastCleintYRef = useRef(0);
  const [draggingEvent, setDraggingEvent] = useState(null);
  // const [currentDragDate, setCurrentDragDate] = useState(null);

  const currentDragDate = useRef(null);
  useEffect(() => {
    setEvents(
      calculatePositions(
        parseEvents(setEventID(props.events), 'dd/MM/yyyy', 'HH:mm:ss'),
      ),
    );
  }, [props.events]);

  const dragStart = (event, distaceFromTop, selectedDate) => {
    console.log('dragStart', event);
    console.log('dragStart', distaceFromTop);
    console.log('dragStart', new Date(selectedDate));
    // setCurrentDragDate(selectedDate);
    currentDragDate.current = selectedDate;
    setDraggingEvent({ ...event });
  };

  const dragBoxMouseEnter = date => {
    console.log('dragBoxMouseEnter', date);
    const daysDiff = getDaysDifference(date, currentDragDate.current);
    if (daysDiff != 0) {
      console.log('daysDiff', daysDiff);
      console.log(
        'draggingEvent.startTime + daysDiff * 24 * 3600000',
        new Date(draggingEvent.startTime + daysDiff * 24 * 3600000),
      );
      draggingEvent.startTime =
        draggingEvent.startTime + daysDiff * 24 * 3600000;
      draggingEvent.endTime = draggingEvent.endTime + daysDiff * 24 * 3600000;
      currentDragDate.current = date;
      setDraggingEvent(draggingEvent);
    }
    // check same day
  };

  const dragingHandler = e => {
    e.preventDefault();
    if (!draggingEvent) return;
    if (lastCleintYRef.current === 0) {
      lastCleintYRef.current = e.clientY;
      return;
    }

    const diff = e.clientY - lastCleintYRef.current;
    if (diff > 10 || diff < -10) {
      2 * 100;
      console.log('down', diff); //1diff= boxHeight/boxTime
      draggingEvent.startTime =
        draggingEvent.startTime + (diff / boxHeight) * boxTime * 3600000;
      draggingEvent.endTime =
        draggingEvent.endTime + (diff / boxHeight) * boxTime * 3600000;
      setDraggingEvent({ ...draggingEvent });
      lastCleintYRef.current = e.clientY;
    }

    // const height = (boxHeight / boxTime) * draggingEvent.total_event_time;
    // let element = document.elementFromPoint(e.pageX, e.pageY);

    // if (element) {
    //   // Get the closest td element
    //   // const tableCell = element.closest('.ib-table-hr-box-week');
    //   // const ibCellWeek = element.closest('.ib-cell-week');
    //   // const ibTbWrapper = element.closest('.ib-tb-wrapper');

    //   // if (ibCellWeek && ibTbWrapper) {
    //   //   const { top, left } = ibCellWeek.getBoundingClientRect();
    //   //   const { left: leftLeftWreap } = ibTbWrapper.getBoundingClientRect();

    //   //   const placeholderElement = dragplaceholderRef.current;
    //   //   placeholderElement.style.left = left - leftLeftWreap + 'px';

    //   //   if (e.pageY - top > 0) {
    //   //     placeholderElement.style.top =
    //   //       Math.floor(e.pageY - top - height / 2) + 'px';
    //   //   }

    //   //   placeholderElement.style.width = ibCellWeek.offsetWidth + 'px';

    //   //   placeholderElement.style.height = height + 'px';
    //   // }
    // }
  };
  const dropHandler = e => {
    e.preventDefault();
    setDraggingEvent(null);

    document.removeEventListener('mousemove', dragingHandler);
    document.removeEventListener('mouseup', dropHandler);
  };

  useEffect(() => {
    if (draggingEvent) {
      document.addEventListener('mousemove', dragingHandler);
      document.addEventListener('mouseup', dropHandler);
    }
    return () => {
      document.removeEventListener('mousemove', dragingHandler);
      document.removeEventListener('mouseup', dropHandler);
    };
  }, [draggingEvent]);

  console.log('events', events);
  return (
    <div>
      <h2>7-Day Calendar</h2>
      <div ref={calanderTableRef} className="ib-table ib-table-week">
        <div
          ref={calanderTBRef}
          style={{ position: 'relative', display: 'flex' }}
        >
          <EventHandlerContex.Provider value={[dragStart]}>
            <div className="ib-table-out ib-table-out-week">
              <div className="ib-table-td ib-table-td-week"> 00</div>
              <div className="ib-tb-wrapper ib-tb-wrapper-week">
                {[...Array(7).keys()].map(dayIndex => {
                  const now = new Date();
                  let boxDay = new Date(
                    now.setDate(now.getDate() + dayIndex),
                  ).setHours(0, 0, 0, 0);

                  return (
                    <div
                      key={dayIndex}
                      className="ib-table-td ib-table-td-week"
                      style={{ height: heightOfWeekColumn + 'px' }}
                    >
                      <div key={dayIndex} className="ib-table-th">
                        {formatDate(new Date(boxDay), 'dd/MMM/yyyy')}
                      </div>

                      <DayBoxWeek
                        dayIndex={dayIndex}
                        day={boxDay}
                        calanderTableRef={calanderTableRef}
                        boxHeight={boxHeight}
                        draggingEvent={
                          draggingEvent &&
                          isDateBetween(
                            boxDay,
                            draggingEvent.startTime,
                            draggingEvent.endTime,
                          )
                            ? draggingEvent
                            : null
                        }
                        isDraging={draggingEvent ? true : false}
                        boxTime={boxTime}
                        boxDay={new Date(boxDay)}
                        dragBoxMouseEnter={dragBoxMouseEnter}
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
                    </div>
                  );
                })}
              </div>
              {/* <DragingEvent
                draggingEvent={draggingEvent}
                boxTime={boxTime}
                boxHeight={boxHeight}
              /> */}
            </div>
          </EventHandlerContex.Provider>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
