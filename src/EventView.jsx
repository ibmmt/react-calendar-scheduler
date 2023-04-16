export const EventBoxView = ({ eventObj, isShowTitle }) => {
  const viewStyle = {
    height: 100 + '%',
  };

  return (
    <div className="ib__sc__event-box ib__sc__event-box-week" style={viewStyle}>
      {isShowTitle && (
        <div className="ib__sc__event ib__sc__event-week_title">
          {eventObj.title}
        </div>
      )}
    </div>
  );
};
