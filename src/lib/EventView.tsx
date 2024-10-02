import React from 'react';
import { EventObject } from './type/EventObject';

interface EventBoxViewProps {
  eventObj:EventObject;
  isShowTitle: boolean;
  isStart?: boolean;
}

export const EventBoxView: React.FC<EventBoxViewProps> = ({
  eventObj,
  isShowTitle,
  isStart,
}) => {
  const viewStyle: React.CSSProperties = {
    height: '100%',
  };

  return (
    <div
      className={`ib__sc__event-box-view ${isStart ? 'ib__sc__staring_event_box' : ''} `}
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
