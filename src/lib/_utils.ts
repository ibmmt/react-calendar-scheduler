/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventObject, EventObjectInput } from './type/EventObject';

export const weekdaysArr: string[] = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];
export const fullWeekdayNames: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const monthsArr: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = (dateObj: Date, formatStr: string): string => {
  const year = dateObj.getFullYear().toString();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');

  const shortMonthName = monthsArr[dateObj.getMonth()].slice(0, 3);
  const longMonthName = monthsArr[dateObj.getMonth()];

  const shortWeekdayName = weekdaysArr[dateObj.getDay()];
  const longWeekdayName = fullWeekdayNames[dateObj.getDay()];

  // Replace format placeholders with date values
  let formattedStr = formatStr.replace('yyyy', year);
  formattedStr = formattedStr.replace('yy', year.slice(-2));

  formattedStr = formattedStr.replace('MMMM', longMonthName);
  formattedStr = formattedStr.replace('MMM', shortMonthName);
  formattedStr = formattedStr.replace('MM', month);
  formattedStr = formattedStr.replace('dddd', longWeekdayName);
  formattedStr = formattedStr.replace('ddd', shortWeekdayName);
  formattedStr = formattedStr.replace('dd', day);
  formattedStr = formattedStr.replace('HH', hours);
  formattedStr = formattedStr.replace(
    'hh',
    (Number(hours) % 12 || 12).toString().padStart(2, '0'),
  );
  formattedStr = formattedStr.replace('mm', minutes);
  formattedStr = formattedStr.replace('ss', seconds);
  formattedStr = formattedStr.replace('H', hours);

  return formattedStr;
};

export const parseDate = (dateStr: string, formatStr: string): Date => {
  const formatParts = formatStr.split(/[^a-zA-Z]/);
  const dateParts = dateStr.split(/[^0-9]/);
  let year: number | undefined;
  let month: number | undefined;
  let day: number | undefined;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  for (let i = 0; i < formatParts.length; i++) {
    const formatPart = formatParts[i];
    const datePart = dateParts[i];

    if (formatPart.includes('yyyy')) {
      year = parseInt(datePart, 10);
    } else if (formatPart.includes('MM')) {
      month = parseInt(datePart, 10) - 1;
    } else if (formatPart.includes('dd')) {
      day = parseInt(datePart, 10);
    } else if (formatPart.includes('HH')) {
      hours = parseInt(datePart, 10);
    } else if (formatPart.includes('mm')) {
      minutes = parseInt(datePart, 10);
    } else if (formatPart.includes('ss')) {
      seconds = parseInt(datePart, 10);
    }
  }

  if (year === undefined || month === undefined || day === undefined) {
    throw new Error('Invalid date format or input');
  }

  return new Date(year, month, day, hours, minutes, seconds);
};


// Helper function to shrink overlapping events
const shrinkEvent = (
  leftOvercome: any[],
  percentage: number,
  srinkedObject: any,
) => {
  if (leftOvercome.length === 0) return;

  leftOvercome.forEach(event => {
    if (srinkedObject[event.sc_app__id]) return;
    srinkedObject[event.sc_app__id] = true;
    event.width *= percentage;
    event.left *= percentage;
    shrinkEvent(event.leftOvercome, percentage, srinkedObject);
  });
};

export const calculatePositions = (events: any[],caType:string) => {

  const totalWidth = 100;

  // Sort events by start time
  const sortedEvents = events.sort((a, b) => a['startTime'] - b['startTime']);
  const MIN_OVERLAP_DURATION = caType==='month' ?0: 10 * 60 * 1000; // 30 minutes in milliseconds
  
  let startKey = 'startTime';
  let endKey = 'endTime';
  if(caType==='month'){
    startKey = 'temp_startDate';
    endKey = 'temp_endDate';
  }
  

  

  for (let i = 0; i < sortedEvents.length; i++) {
    if(caType==='month'){
    sortedEvents[i].temp_endDate = new Date(sortedEvents[i].endTime).setHours(0, 0, 0, 0);
    sortedEvents[i].temp_startDate = new Date(sortedEvents[i].startTime).setHours(0, 0, 0, 0);
    }


    let width = 0;
    let left = 0;

    const leftOvercome: any[] = [];

    for (let k = 0; k < i; k++) {
     

      if (sortedEvents[k][endKey] >= sortedEvents[i][startKey]) {
    
        const overlapDuration = sortedEvents[k][endKey] - sortedEvents[i][startKey];
       

        if (overlapDuration >= MIN_OVERLAP_DURATION) {
          leftOvercome.push(sortedEvents[k]);
        }
      }

    }




    if (leftOvercome.length) {
      leftOvercome.sort((a, b) => a.left - b.left);

      if (leftOvercome[0].left > 0) {
        width = leftOvercome[0].left;
      } else {
        for (let k = 0; k < leftOvercome.length - 1; k++) {
          if (
            leftOvercome[k + 1].left -
              (leftOvercome[k].width + leftOvercome[k].left) >
            1
          ) {
            width =
              leftOvercome[k].left +
              leftOvercome[k].width -
              leftOvercome[k].left;
            left = leftOvercome[k].left + leftOvercome[k].width;
            break;
          }
        }
      }

      if (
        width === 0 &&
        totalWidth -
          leftOvercome[leftOvercome.length - 1].left -
          leftOvercome[leftOvercome.length - 1].width >
          1
      ) {
        width =
          totalWidth -
          leftOvercome[leftOvercome.length - 1].left -
          leftOvercome[leftOvercome.length - 1].width;
        left =
          leftOvercome[leftOvercome.length - 1].left +
          leftOvercome[leftOvercome.length - 1].width;
      }
    }

    sortedEvents[i].leftOvercome = leftOvercome;

    if (width === 0) {
      if (leftOvercome.length === 0) {
        width = totalWidth;
      } else {
        width = totalWidth / (1 + totalWidth / leftOvercome[0].width);
      }
      left = totalWidth - width;

      shrinkEvent(leftOvercome, 1 - width / totalWidth, {});
    }

    sortedEvents[i].width = width;
    sortedEvents[i].left = left;
  }

  return sortedEvents;
};


// const strinkEvent = (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   leftOvercome: any[],
//   percentage: number,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   srinkedObject: any,
// ) => {
//   if (leftOvercome.length === 0) return;

//   leftOvercome.forEach(event => {
//     if (srinkedObject[event.sc_app__id]) return;
//     srinkedObject[event.sc_app__id] = true;
//     event.width = event.width * percentage;
//     event.left = event.left * percentage;
//     strinkEvent(event.leftOvercome, percentage, srinkedObject);
//   });
// };

// export const calculatePositions = (events: any[]) => {
  
//   const totalWidth = 100;
//   //sort events by start time
//   const sortedEvents = events.sort((a, b) => a['startTime'] - b['startTime']);

//   const startKey =  'startTime';
//   const endKey =  'endTime';

//   for (let i = 0; i < sortedEvents.length; i++) {
//     let width = 0;
//     let left = 0;

//     const leftOvercome: any[] = [];

//     for (let k = 0; k < i; k++) {
//       if (sortedEvents[k][endKey] - sortedEvents[i][startKey] > 1 * 1000) {
//         leftOvercome.push(sortedEvents[k]);
//       }
//     }

//     if (leftOvercome.length) {
//       leftOvercome.sort((a, b) => a.left - b.left);

//       if (leftOvercome[0].left > 0) {
//         width = leftOvercome[0].left;
//       } else {
//         for (let k = 0; k < leftOvercome.length - 1; k++) {
//           if (
//             leftOvercome[k + 1].left -
//               (leftOvercome[k].width + leftOvercome[k].left) >
//             1
//           ) {
//             width =
//               leftOvercome[k].left +
//               leftOvercome[k].width -
//               leftOvercome[k].left;
//             left = leftOvercome[k].left + leftOvercome[k].width;
//             break;
//           }
//         }
//       }

//       if (
//         width === 0 &&
//         totalWidth -
//           leftOvercome[leftOvercome.length - 1].left -
//           leftOvercome[leftOvercome.length - 1].width >
//           1
//       ) {
//         width =
//           totalWidth -
//           leftOvercome[leftOvercome.length - 1].left -
//           leftOvercome[leftOvercome.length - 1].width;
//         left =
//           leftOvercome[leftOvercome.length - 1].left +
//           leftOvercome[leftOvercome.length - 1].width;
//       }
//     }

//     sortedEvents[i].leftOvercome = leftOvercome;

//     if (width === 0) {
//       if (leftOvercome.length === 0) {
//         width = totalWidth;
//       } else {
//         width = totalWidth / (1 + totalWidth / leftOvercome[0].width);
//       }
//       left = totalWidth - width;

//       strinkEvent(leftOvercome, 1 - width / totalWidth, {});
//     }

//     sortedEvents[i].width = width;
//     sortedEvents[i].left = left;
//   }



//   return sortedEvents;
// };

export const convertToComponentEventFormat = (
  events: EventObjectInput[],
  dateFormat: string,
) => {
  const tempEvents: EventObject[] = [];

  for (let i = 0; i < events.length; i++) {
    const eventObj = events[i];

    const startDate = new Date(
      parseDate(eventObj.startDate, dateFormat),
    ).setHours(0, 0, 0, 0);
    const endDate = new Date(parseDate(eventObj.endDate, dateFormat)).setHours(
      0,
      0,
      0,
      0,
    );

    const startTimeSplit = eventObj.startTime
      ? eventObj.startTime.split(':')
      : ['0', '0', '0', '0'];
    const endTimeSplit = eventObj.startTime
      ? eventObj.endTime.split(':')
      : ['0', '0', '0', '0'];
    // ---todo validate date formate
    const startTime = new Date(startDate).setHours(
      parseInt(startTimeSplit[0], 10),
      parseInt(startTimeSplit[1], 10),
      parseInt(startTimeSplit[2], 10),
      0,
    );
    const endTime = new Date(endDate).setHours(
      parseInt(endTimeSplit[0], 10),
      parseInt(endTimeSplit[1], 10),
      parseInt(endTimeSplit[2], 10),
      0,
    );

    const total_event_time = (endTime - startTime) / 3600000;

    const eventObjNew = {
      ...eventObj,
      sc_app__id: eventObj.sc_app__id,
      title: eventObj.title,
      startDate,
      endDate,
      startTime,
      endTime,
      total_event_time,
      isDragable: eventObj.draggable === undefined ? true : Boolean(eventObj.draggable),
      isResizable:
        eventObj.resizable === undefined ? true : Boolean(eventObj.resizable),
    };
    tempEvents.push(eventObjNew);
  }

  return tempEvents;
};

export const isDateBetween = (
  dateObj: Date,
  startTime: string | number | Date,
  endTime: string | number | Date,
): boolean => {
  const date = dateObj.getTime();
  const startTime_daystart = new Date(startTime).setHours(0, 0, 0, 0);
  const endtime_dayend = new Date(endTime).setHours(23, 59, 59, 999);

  return date >= startTime_daystart && date <= endtime_dayend;
};

export const setEventID = <T extends EventObject | EventObjectInput>(
  events: T[],
): T[] => {
  if (!events) return [];
  for (let i = 0; i < events.length; i++) {
    events[i].sc_app__id = i + 1;
  }
  return events;
};

export function findAncestor(el: HTMLElement, cls: string): HTMLElement | null {
  while ((el = el.parentElement as HTMLElement) && !el.classList.contains(cls));
  return el;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getDaysDifference(date1: Date, date2: Date): number {
  const diffMs = date1.getTime() - date2.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return days;
}

export function addDays(date: Date, days: number): Date {
  const dateMs = date.getTime();
  const daysMs = days * 24 * 60 * 60 * 1000;
  const newDateMs = dateMs + daysMs;
  const newDate = new Date(newDateMs);
  return newDate;
}

export function addTimeStringTodate(date: Date, time: string): Date {
  let [hours, minutes] = time.split(':');
  const hours_num = Number(hours);
  minutes = minutes.replace(/[^0-9]/g, '');

  if (time.includes('PM') && hours_num < 12) {
    hours += 12;
  }

  date.setHours(hours_num);
  date.setMinutes(Number(minutes));

  return date;
}

export function eventObjectToEvent(eventObj: any): any {
  const event = {
    id: eventObj.sc_app__id,
    title: eventObj.title,
    startDate: formatDate(new Date(eventObj.startTime), 'dd/MM/yyyy'),
    endDate: formatDate(new Date(eventObj.endTime), 'dd/MM/yyyy'),
    startTime: formatDate(new Date(eventObj.startTime), 'H:mm:ss'),
    endTime: formatDate(new Date(eventObj.endTime), 'H:mm:ss'),
    bg_color: eventObj.bg_color,
  };

  return event;
}

export function getPreviousDay(dayNo: number | undefined, date?: Date): Date {
  dayNo = dayNo !== undefined ? dayNo : 1;

  const today = date ? date : new Date();
  if (today.getDay() === dayNo) {
    return today;
  }
  const daysToPreviousDay = (today.getDay() + 7 - dayNo) % 7;
  const previousDay = new Date(today.getTime() - daysToPreviousDay * 86400000);
  return previousDay;
}

export const nextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

export const prevMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

export const timeFormateFromHour = (
  hours: number,
  timeFormat: number,
): string => {
  if (timeFormat == 12) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeString = ('0' + hours).slice(-2) + ':' + '00' + ' ' + ampm;
    return timeString;
  } else {
    const timeString = ('0' + hours).slice(-2) + ':' + '00';
    return timeString;
  }
};

export const convertToOutputEventFormat = (
  eventObj: EventObject,
): EventObjectInput => {
  const event: EventObjectInput = {
    ...eventObj,
    startDate: eventObj.startTime
      ? formatDate(new Date(eventObj.startTime), 'dd/MM/yyyy')
      : '',
    endDate: eventObj.endTime
      ? formatDate(new Date(eventObj.endTime), 'dd/MM/yyyy')
      : '',
    startTime: eventObj.startTime
      ? formatDate(new Date(eventObj.startTime), 'H:mm:ss')
      : '',
    endTime: eventObj.endTime
      ? formatDate(new Date(eventObj.endTime), 'H:mm:ss')
      : '',
  };
  return event;
};

export const isUpadteNeeded = (
  eventObj: EventObject,
  events: EventObject[],
): boolean => {
  const event = events.find(e => e.sc_app__id === eventObj.sc_app__id);
  if (
    event &&
    (event.startTime !== eventObj.startTime ||
      event.endTime !== eventObj.endTime)
  ) {
    return true;
  }
  return false;
};

export const convertTo12Hour = (timeStr: string) => {
  if (!timeStr) return '';

  timeStr = timeStr.trim();
  timeStr = timeStr.toUpperCase();
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;

  const [hours, minutes] = timeStr.split(':');

  let hoursInt = parseInt(hours, 10);

  let period = 'AM';

  if (hoursInt >= 12) {
    period = 'PM';
  }
  if (hoursInt > 24) {
    hoursInt = hoursInt % 10;
  }

  if (hoursInt == 0) {
    hoursInt = 12;
  } else if (hoursInt > 12) {
    hoursInt -= 12;
  }
 
  return `${hoursInt.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${period}`;
};

export const convertTo24HourFormat = (timeStr: string): string => {
  // Check for AM or PM in the time string

  const isPM = timeStr.toLowerCase().includes('pm');
  const timeParts = timeStr.split(/[:\s]/); // Split by colon and/or whitespace

  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours > 12 ||
    hours < 1 ||
    minutes > 59 ||
    minutes < 0
  ) {
    console.error('Invalid time format');
    return '12:00';
  }

  if (isPM && hours !== 12) {
    hours += 12;
  }

  if (!isPM && hours === 12) {
    hours = 0;
  }
  const timeString = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}`;

  return timeString;
};
