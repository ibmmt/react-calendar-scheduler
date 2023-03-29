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

function isGapAvailable(events, left, width) {
  // Check if any of the events in the row overlap with the new event
  if (events.length == 3) {
    console.log(events, left, width);
  }
  for (let i = 0; i < events.length; i++) {
    const other = events[i];
    if (left < other.left + other.width && left + width > other.left) {
      return false;
    }
  }
  return true;
}

export const calculatePositions = events => {
  // Sort events by start time
  const sortedEvents = events.sort((a, b) => a.startTime - b.startTime);

  // Find number of overlapping events and overcome position for each event
  for (let i = 0; i < sortedEvents.length; i++) {
    let noOfOvercome = 1;
    let leftIndex = 0;
    const overcome = [];
    const leftOvercome = [];

    for (let j = 0; j < sortedEvents.length; j++) {
      if (
        i !== j &&
        sortedEvents[i].endTime > sortedEvents[j].startTime &&
        sortedEvents[i].startTime < sortedEvents[j].endTime
      ) {
        noOfOvercome++;
        overcome.push(sortedEvents[j]);
        if (i > j) {
          leftIndex++;
          leftOvercome.push(sortedEvents[j]);
        }
      }
    }
    sortedEvents[i].noOfOvercome = noOfOvercome;
    sortedEvents[i].leftIndex = leftIndex;
    sortedEvents[i].overcome = overcome;
    sortedEvents[i].leftOvercome = leftOvercome;
  }
  console.log('before remove parallel', sortedEvents);
  // -----remove parallel overcome
  for (let i = 0; i < sortedEvents.length; i++) {
    sortedEvents[i].index = i;

    const { overcome } = sortedEvents[i];

    const { leftOvercome } = sortedEvents[i];
    console.log(
      'sortedEvents[i]=========================================',
      sortedEvents[i],
    );

    const removedOvercome = [];

    for (let k = 0; k < overcome.length - 1; k++) {
      if (
        overcome[k].startTime >= overcome[k + 1].endTime ||
        overcome[k].endTime <= overcome[k + 1].startTime
      ) {
        removedOvercome.push(overcome[k].id);
        overcome.splice(k, 1);
        k--;
      }
    }

    // for (let k = overcome.length - 1; k >= 0; k--) {
    //   for (let l = overcome.length - 1; l >= 0; l--) {
    //     console.log('k',k,'l',l,overcome,overcome[k],overcome[l])
    //     if (
    //       k !== l &&
    //       (overcome[k].startTime >= overcome[l].endTime ||
    //         overcome[k].endTime <= overcome[l].startTime)
    //     ) {
    //       console.log('removed==============================================');
    //       removedOvercome.push(overcome[l].id);
    //       overcome.splice(l, 1);
    //       sortedEvents[i].noOfOvercome--;
    //     }
    //   }
    // }

    for (let j = leftOvercome.length - 1; j >= 0; j--) {
      if (removedOvercome.includes(leftOvercome.id)) {
        leftOvercome.splice(j, 1);
        sortedEvents[i].leftIndex--;
      }
    }

    sortedEvents[i].leftOvercome = leftOvercome;
    sortedEvents[i].overcome = overcome;
  }

  // Calculate width and left position of each event based on its overcome position
  const totalWidth = 100;
  for (let i = 0; i < sortedEvents.length; i++) {
    const { leftOvercome } = sortedEvents[i];
    const { noOfOvercome } = sortedEvents[i];
    const width = totalWidth / noOfOvercome;
    let left = 0;
    if (leftOvercome.length) {
      // ----check any gap available
      let isFilled = false;

      // sort leftOvercome by left
      leftOvercome.sort((a, b) => a.left - b.left);
      console.log(
        'leftOvercome===>',
        leftOvercome,
        isGapAvailable(leftOvercome, 0, width),
        0,
        width,
      );

      if (
        leftOvercome[0].left >= width &&
        isGapAvailable(leftOvercome, 0, width)
      ) {
        left = 0;
        isFilled = true;
      } else {
        for (let j = 0; j < leftOvercome.length - 2; j++) {
          //  console.log('leftOvercome===>',leftOvercome,isGapAvailable(leftOvercome, 0, width),0,width)

          if (
            leftOvercome[j + 1].left -
              leftOvercome[j].left +
              leftOvercome[j].width >=
              width &&
            isGapAvailable(
              leftOvercome,
              leftOvercome[j].left + leftOvercome[j].width,
              width,
            )
          ) {
            left = leftOvercome[j].left + leftOvercome[j].width;
            isFilled = true;
          }
        }
      }
      if (!isFilled) {
        left =
          leftOvercome[leftOvercome.length - 1].left +
          leftOvercome[leftOvercome.length - 1].width;
      }
    }
    sortedEvents[i].width = width;
    sortedEvents[i].left = left;
  }

  // Return sorted events with widths and positions
  return sortedEvents;
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
    const mid = new Date(startTime + (total_event_time * 3600000) / 2);

    const eventObjNew = {
      id: eventObj.id,
      title: eventObj.title,
      startDate,
      endDate,
      startTime,
      endTime,
      mid,
      mid_day_string: formatDate(mid, 'dd/MM/yyyy'),
      total_event_time,
    };
    tempEvents.push(eventObjNew);
    console.log('parseEvents--', events);
  }

  console.log('parseEvents--', tempEvents);
  return tempEvents;
};
