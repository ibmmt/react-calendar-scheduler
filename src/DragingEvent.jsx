import { useEffect, useRef } from 'react';

const DragingEvent = ({ draggingEvent, boxHeight, boxTime }) => {
  const dragplaceholderRef = useRef(null);

  const dragingHandler = e => {
    e.preventDefault();
    if (!draggingEvent) return;
    const height = (boxHeight / boxTime) * draggingEvent.total_event_time;
    let element = document.elementFromPoint(e.pageX, e.pageY);

    if (element) {
      // Get the closest td element
      // const tableCell = element.closest('.ib-table-hr-box-week');
      const ibCellWeek = element.closest('.ib-cell-week');
      const ibTbWrapper = element.closest('.ib-tb-wrapper');

      if (ibCellWeek && ibTbWrapper) {
        const { top, left } = ibCellWeek.getBoundingClientRect();
        const { left: leftLeftWreap } = ibTbWrapper.getBoundingClientRect();

        const placeholderElement = dragplaceholderRef.current;
        placeholderElement.style.left = left - leftLeftWreap + 'px';

        if (e.pageY - top > 0) {
          placeholderElement.style.top =
            Math.floor(e.pageY - top - height / 2) + 'px';
        }

        placeholderElement.style.width = ibCellWeek.offsetWidth + 'px';

        placeholderElement.style.height = height + 'px';
      }
    }
  };

  useEffect(() => {
    if (draggingEvent) {
      document.addEventListener('mousemove', dragingHandler);
      document.addEventListener('mouseup', dropHandler);
      return () => {
        document.removeEventListener('mousemove', dragingHandler);
        document.removeEventListener('mouseup', dropHandler);
      };
    } else {
      document.removeEventListener('mousemove', dragingHandler);
      document.removeEventListener('mouseup', dropHandler);
    }
  }, [draggingEvent]);

  const dropHandler = e => {
    e.preventDefault();

    document.removeEventListener('mousemove', dragingHandler);
    document.removeEventListener('mouseup', dropHandler);
  };

  return (
    <div
      className="placeholder"
      ref={dragplaceholderRef}
      // style={{ ...placeHolderStyle }}
    >
      555554444444444
    </div>
  );
};

export default DragingEvent;
