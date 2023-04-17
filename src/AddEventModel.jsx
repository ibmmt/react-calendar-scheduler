import { useState } from 'react';
import TimeInput from './TimeInput';
import { addTimeStringTodate, formatDate } from './_utils';

export const AddEventModel = ({
  show,
  handleClose,
  handleAddEvent,
  eventObj: {
    title: titleInit = '',
    startDate: startDateInit = '',
    endDate: endDateInit = '',
    startTime: startTimeInit = '',
    endTime: endTimeInit = '',
    bg_color: bg_colorInit = '#5c6bc0',
    description: descriptionInit = '',
    ...otherEventData
  },
}) => {
  const now = new Date();
  const dateString = formatDate(now, 'yyyy-MM-dd');
  const [title, setTitle] = useState(titleInit);
  const [startDate, setStartDate] = useState(
    startDateInit ? startDateInit : dateString,
  );
  const [endDate, setEndDate] = useState(
    endDateInit ? endDateInit : dateString,
  );
  const [startTime, setStartTime] = useState(startTimeInit);
  const [endTime, setEndTime] = useState(endTimeInit);
  const [bg_color, setBg_color] = useState(bg_colorInit);
  const [description, setDescription] = useState(descriptionInit);

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateTimeAndDate()) {
      return;
    }
    const startDateObj = addTimeStringTodate(new Date(startDate), startTime);
    const endDateObj = addTimeStringTodate(new Date(endDate), endTime);
    console.log('startDateObj', startDateObj);
    console.log('endDateObj', endDateObj);
    const eventObj = {
      ...otherEventData,
      title,
      startDate: formatDate(new Date(startDateObj), 'dd/MM/yyyy'),
      endDate: formatDate(new Date(endDateObj), 'dd/MM/yyyy'),
      startTime: formatDate(new Date(startDateObj), 'H:mm:ss'),
      endTime: formatDate(new Date(endDateObj), 'H:mm:ss'),
      bg_color: bg_color,
    };
    console.log('eventObj', eventObj);

    handleAddEvent(eventObj);
    handleClose();
  };

  const validateTimeAndDate = () => {
    console.log(startDate, endDate, startTime, endTime);
    if (!startDate || !endDate || !startTime || !endTime) {
      alert('Please fill all the fields');
      return false;
    }

    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      alert('Invalid date');
      return false;
    }

    startDateObj = addTimeStringTodate(startDateObj, startTime);
    endDateObj = addTimeStringTodate(endDateObj, endTime);

    // check valid date and time
    if (startDateObj.getTime() > endDateObj.getTime()) {
      alert('Start date cannot be greater than end date');
      return false;
    }

    return true;
  };

  return (
    <div
      className="modal-wrapper ib__sc-modal"
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className="ib__sc-modal-content ">
        <div className="modal-header">
          <p>Add Event</p>
          <span className="ib__sc__close-modal-btn" onClick={handleClose}>
            ×
          </span>
        </div>
        <div className="ib__sc-modal-body">
          <form>
            <div className="ib__sc__form-group">
              <label className="ib__sc-label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                className="ib__sc-form-control"
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="ib__sc__form-time-row">
              <div className="ib__sc__form-group">
                <label className="ib__sc-label" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  type="date"
                  placeholder="yyyy-mm-dd"
                  className="ib__sc-form-control"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                />

                <label className="ib__sc-label" htmlFor="startTime">
                  Start Time
                </label>
                <TimeInput
                  value={startTime}
                  onChange={value => setStartTime(value)}
                />
              </div>

              <div className="ib__sc__form-group">
                <label className="ib__sc-label" htmlFor="endDate">
                  End Date
                </label>
                <input
                  type="date"
                  placeholder="yyyy-mm-dd"
                  className="ib__sc-form-control"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  required
                />

                <label className="ib__sc-label" htmlFor="endTime">
                  End Time
                </label>
                <TimeInput
                  value={endTime}
                  onChange={value => setEndTime(value)}
                />
              </div>
            </div>
            <div className="ib__sc__form-group">
              <label className="ib__sc-label" htmlFor="bg_color">
                Description
              </label>
              <input
                type="color"
                value={bg_color}
                className="ib__sc-form-control"
                onChange={e => setBg_color(e.target.value)}
                required
              />
            </div>
            <div className="ib__sc__form-group">
              <label className="ib__sc-label" htmlFor="bg_color">
                Decription
              </label>
              <textarea
                value={description}
                className="ib__sc-form-control"
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
