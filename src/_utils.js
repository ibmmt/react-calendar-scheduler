export const formatDate = (dateObj, formatStr) => {
  const year = dateObj.getFullYear().toString();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const monthsArr = [
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
  const shortMonthName = monthsArr[dateObj.getMonth()].slice(0, 3);
  const longMonthName = monthsArr[dateObj.getMonth()];
  const weekdaysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullWeekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
    (hours % 12 || 12).toString().padStart(2, '0'),
  );
  formattedStr = formattedStr.replace('mm', minutes);
  formattedStr = formattedStr.replace('ss', seconds);
  formattedStr = formattedStr.replace('H', hours);

  return formattedStr;
};

export const parseDate = (dateStr, formatStr) => {
  const formatParts = formatStr.split(/[^a-zA-Z]/);
  const dateParts = dateStr.split(/[^0-9]/);
  let year;
  let month;
  let day;
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

  return new Date(year, month, day, hours, minutes, seconds);
};
const strinkEvent = (leftOvercome, percentage, srinkedObject) => {
  if (leftOvercome.length === 0) return;

  leftOvercome.forEach(event => {
    if (srinkedObject[event.sc_app__id]) return;
    srinkedObject[event.sc_app__id] = true;
    event.width = event.width * percentage;
    event.left = event.left * percentage;
    strinkEvent(event.leftOvercome, percentage, srinkedObject);
  });
};

export const calculatePositions = (events, isFullCalander) => {
  const totalWidth = 100;
  //sort events by start time
  const startKey = isFullCalander ? 'startDate' : 'startTime';
  const endKey = isFullCalander ? 'endDate' : 'endTime';

  let sortedEvents = events.sort((a, b) => a[startKey] - b[startKey]);

  for (let i = 0; i < sortedEvents.length; i++) {
    let width = 0;
    let left = 0;
    let leftOvercome = [];

    //  console.log('\n\nEvent==================', sortedEvents[i].title);
    //console.log('i>>>>>>>>>>>', i);
    for (let k = 0; k < i; k++) {
      //console.log('k', k, i, sortedEvents[k].title);
      if (sortedEvents[k][endKey] > sortedEvents[i][startKey]) {
        leftOvercome.push(sortedEvents[k]);
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

      strinkEvent(leftOvercome, 1 - width / totalWidth, {});
    }

    sortedEvents[i].width = width;
    sortedEvents[i].left = left;
  }
  return sortedEvents;
  //------------
};

export const parseEvents = (events, dateFormat) => {
  const tempEvents = [];

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
      : [0, 0, 0, 0];
    const endTimeSplit = eventObj.startTime
      ? eventObj.endTime.split(':')
      : [0, 0, 0, 0];
    // ---todo validate date formate
    const startTime = new Date(startDate).setHours(
      startTimeSplit[0],
      startTimeSplit[1],
      startTimeSplit[2],
      0,
    );
    const endTime = new Date(endDate).setHours(
      endTimeSplit[0],
      endTimeSplit[1],
      endTimeSplit[2],
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
    };
    tempEvents.push(eventObjNew);
  }

  return tempEvents;
};

export const isDateBetween = (dateObj, startDateString, endDateString) => {
  const date = new Date(dateObj).getTime();
  const startDate = new Date(startDateString).setHours(0, 0, 0, 0);
  const endDate = new Date(endDateString).setHours(0, 0, 0, 0);

  return date >= startDate && date <= endDate;
};

export const setEventID = events => {
  for (let i = 0; i < events.length; i++) {
    events[i].sc_app__id = i;
  }
  return events;
};

export function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getDaysDifference(date1, date2) {
  const diffMs = date1 - date2;
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return days;
}

export function addDays(date, days) {
  const dateMs = date.getTime();
  const daysMs = days * 24 * 60 * 60 * 1000;
  const newDateMs = dateMs + daysMs;
  const newDate = new Date(newDateMs);
  return newDate;
}

export function addTimeStringTodate(date, time) {
  let [hours, minutes] = time.split(':');
  hours = Number(hours);
  minutes = minutes.replace(/[^0-9]/g, '');

  if (time.includes('PM') && hours < 12) {
    hours += 12;
  }

  date.setHours(hours);
  date.setMinutes(Number(minutes));

  return date;
}

// export function eventListToSCList(events) {
//   let eventObjects = [];
//   for (let i = 0; i < events.length; i++) {
//     eventObjects.push({
//       ...events[i],
//       originalEvent: events[i],
//     });
//   }
//   return eventObjects;
// }

export function eventObjectToEvent(eventObj) {
  const event = {
    id: eventObj.sc_app__id,
    title: eventObj.title,
    startDate: formatDate(eventObj.startTime, 'dd/MM/yyyy'),
    endDate: formatDate(eventObj.endTime, 'dd/MM/yyyy'),
    startTime: formatDate(eventObj.startTime, 'H:mm:ss'),
    endTime: formatDate(eventObj.endTime, 'H:mm:ss'),
    bg_color: eventObj.bg_color,
  };

  return event;
}

export function getPreviousDay(dayNo) {
  dayNo = dayNo ? dayNo : 1;
  const today = new Date();
  if (today.getDay() === dayNo) {
    return today;
  }
  const daysToPreviousDay = (today.getDay() + 7 - dayNo) % 7;
  const previousDay = new Date(today.getTime() - daysToPreviousDay * 86400000);
  console.log(previousDay);
  return previousDay;
}

export const nextMonth = date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

// Helper function to go back to the previous month
export const prevMonth = date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};
