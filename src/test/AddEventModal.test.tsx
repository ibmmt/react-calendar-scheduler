import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ReactCalendarScheduler from '../lib/ReactCalendarScheduler';
import { samepleEvents } from './SampleData';
React.useLayoutEffect = React.useEffect;
afterEach(cleanup);
describe('AddEventModal', () => {

  const { container } = render(<ReactCalendarScheduler events={samepleEvents} calenderType="week" />);

  test('renders correctly', () => {
    expect(container).toHaveTextContent(`Week`);
  });

  test('should render AddEventModal', () => {
    const { container } = render(
      <ReactCalendarScheduler  events={samepleEvents}  calenderType="week" />,
    );
    expect(container).toBeVisible();
    const component = document.querySelectorAll('.ib__sc__table-hr-box-week');

    if (component[10]) {
      fireEvent.click(component[10]);
      //expect(screen.getByText('Add Event')).toBeInTheDocument();

      expect(
        document.querySelector('.ib__sc_add_event_box'),
      ).toBeInTheDocument();
    }
    expect(screen.getByText('Month')).toBeInTheDocument();
  });
});
