import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ReactCalnaderScheduler from '../ReactCalanderScheduler';

//add to numbers
afterEach(cleanup);

describe('AddEventModal', () => {
  const { container } = render(<ReactCalnaderScheduler calanderType="week" />);

  test('renders correctly', () => {
    expect(container).toHaveTextContent(`Week`);
  });

  test('should render AddEventModal', () => {
    const { container } = render(
      <ReactCalnaderScheduler calanderType="week" />,
    );
    expect(container).toBeVisible();
    const component = document.querySelectorAll('.ib__sc__table-hr-box-week');
    if (component[10]) {
      fireEvent.click(component[10]);
      expect(screen.getByText('Add Event')).toBeInTheDocument();
    }
    expect(screen.getByText('Month')).toBeInTheDocument();
  });
});
