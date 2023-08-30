import React, { useState } from 'react';

import { addTimeStringTodate, formatDate } from './_utils';
import { EventObjectInput } from './type/EventObject';
import TimeInput from './Extra/TimeInput';


interface Props {
  show: boolean;
  handleClose: () => void;
  handleAddEvent: (event: EventObjectInput) => void;
  handleDeleteEvent: (sc_app__id: number) => void;
  eventObj: EventObjectInput;
}

const AddEventModal: React.FC<Props> = ({
  show,
  handleClose,
  handleAddEvent,
  handleDeleteEvent: _handleDeleteEvent,
  eventObj: {
    title: titleInit = '',
    startDate: startDateInit = '',
    endDate: endDateInit = '',
    startTime: startTimeInit = '',
    endTime: endTimeInit = '',
    bg_color: bg_colorInit = '#5c6bc0',
    description: descriptionInit = '',
    sc_app__id = '',
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

  /**
   * handle submit event
   * @param {*} e
   * @returns
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTimeAndDate()) {
      return;
    }
    const startDateObj = addTimeStringTodate(new Date(startDate), startTime);
    const endDateObj = addTimeStringTodate(new Date(endDate), endTime);

    const eventObj = {
      ...otherEventData,
      title,
      sc_app__id,
      description,

      startDate: formatDate(new Date(startDateObj), 'dd/MM/yyyy'),
      endDate: formatDate(new Date(endDateObj), 'dd/MM/yyyy'),
      startTime: formatDate(new Date(startDateObj), 'H:mm:ss'),
      endTime: formatDate(new Date(endDateObj), 'H:mm:ss'),
      bg_color: bg_color,
    };

    handleAddEvent(eventObj);
    handleClose();
  };

  /**
   * handle delete event
   * @param {*} e
   */
  const handleDeleteEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    _handleDeleteEvent && _handleDeleteEvent(sc_app__id as number);
    handleClose();
  };

  /**
   * Validate date and time
   * @returns {Boolean} true if valid date and time
   */
  const validateTimeAndDate = () => {
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
      onClick={e => {
        if (
          e.target instanceof HTMLElement &&
          e.target.className.includes('ib__sc-modal')
        ) {
          handleClose();
        }
      }}
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className="ib__sc-modal-content ib__sc_add_event_box">
        <div className="modal-header">
          {!sc_app__id ? <p>Add Event</p> : <p>Edit Event</p>}
          <span className="ib__sc__close-modal-btn" onClick={handleClose}>
            ×
          </span>
        </div>
        <div className="ib__sc-modal-body">
          <form noValidate>
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
                  value={startTime as string}
                  onChange={(value:string) => setStartTime(value)}
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
                  value={endTime as string}
                  onChange={(value:string) => setEndTime(value)}
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
            <div className="ib__sc__modal_footer">
              <button className="ib__sc__btn" onClick={handleSubmit}>
                {!sc_app__id ? <>Save</> : <>Update </>}
              </button>

              {sc_app__id && (
                <button
                  className="ib__sc__btn"
                  onClick={e => {
                    e.preventDefault();
                  }}
                  onDoubleClick={handleDeleteEvent}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
