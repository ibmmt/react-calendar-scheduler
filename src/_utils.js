export const formatDate = (dateObj, formatStr) => {
  const year = dateObj.getFullYear().toString();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const monthsArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',

    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const shortMonthName = monthsArr[dateObj.getMonth()];
  const longMonthName = monthsArr[dateObj.getMonth() + 12];
  const weekdaysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const shortWeekdayName = weekdaysArr[dateObj.getDay()];
  const longWeekdayName = weekdaysArr[dateObj.getDay() + 7];

  // Replace format placeholders with date values
  let formattedStr = formatStr.replace('yyyy', year);
  formattedStr = formattedStr.replace('yy', year.slice(-2));
  formattedStr = formattedStr.replace('MM', month);
  formattedStr = formattedStr.replace('MMM', shortMonthName);
  formattedStr = formattedStr.replace('MMMM', longMonthName);
  formattedStr = formattedStr.replace('dd', day);
  formattedStr = formattedStr.replace('HH', hours);
  formattedStr = formattedStr.replace(
    'hh',
    (hours % 12 || 12).toString().padStart(2, '0'),
  );
  formattedStr = formattedStr.replace('mm', minutes);
  formattedStr = formattedStr.replace('ss', seconds);
  formattedStr = formattedStr.replace('H', hours);
  formattedStr = formattedStr.replace('ddd', shortWeekdayName);
  formattedStr = formattedStr.replace('dddd', longWeekdayName);

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

export const calculatePositions = events => {
  const totalWidth = 100;
  //sort events by start time

  const sortedEvents = events.sort((a, b) => a.startTime - b.startTime);

  for (let i = 0; i < sortedEvents.length; i++) {
    let width = 0;
    let left = 0;
    let leftOvercome = [];
    console.log('\n\nEvent==================', sortedEvents[i].title);
    console.log('i>>>>>>>>>>>', i);
    for (let k = 0; k < i; k++) {
      console.log('k', k, i, sortedEvents[k].title);
      if (sortedEvents[k].endTime > sortedEvents[i].startTime) {
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
      console.log('there is no space to fill>', sortedEvents[i].title);
      console.log('leftOvercome', leftOvercome);
      // console.log('there is no space to fill>', sortedEvents[i].title);
      // width = totalWidth / (leftOvercome.length + 1);
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
    // console.log('width', width);
    // console.log('left', left);
    console.log('leftOvercome', leftOvercome);
    // console.log('=======End=====');
  }
  return sortedEvents;
  //------------
};

export const parseEvents = (events, dateFormat) => {
  const tempEvents = [];
  console.log('parseEvents--', events);

  for (let i = 0; i < events.length; i++) {
    const eventObj = events[i];
    // ----todo vlaidate date
    // startDate:"26/03/2023", endDate:"26/03/2023", startT ime:"13:00:00",endTime:"14:00:00"

    const startDate = new Date(
      parseDate(eventObj.startDate, dateFormat),
    ).setHours(0, 0, 0, 0);
    const endDate = new Date(
      parseDate(eventObj.startDate, dateFormat),
    ).setHours(0, 0, 0, 0);

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
      sc_app__id: eventObj.sc_app__id,
      title: eventObj.title,

      startTime,
      endTime,

      total_event_time,
    };
    tempEvents.push(eventObjNew);
    //  console.log('parseEvents--', events);
  }

  //  console.log('parseEvents--', tempEvents);
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
