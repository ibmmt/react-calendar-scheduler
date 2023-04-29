import React from 'react';
export const EventBoxView = ({ eventObj, isShowTitle, isStart }) => {
  const viewStyle = {
    height: 100 + '%',
  };

  return (
    <div
      className={
        'ib__sc__event-box-view ' +
        (isStart ? 'ib__sc__staring_event_box' : ' ') +
        (eventObj.custom_class ? eventObj.custom_class : '')
      }
      style={viewStyle}
    >
      {isShowTitle && (
        <div className="ib__sc__event ib__sc__event-week_title">
          {eventObj.title}
        </div>
      )}
      {isShowTitle && (
        <>
          <div className="ib__sc__event-element">
            {eventObj.element && eventObj.element}
          </div>
          <div className="ib__sc__event-description">
            {eventObj.description && eventObj.description}
          </div>
        </>
      )}
    </div>
  );
};
