import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ReactCalnaderScheduler from '../ReactCalanderScheduler';
import { samepleEvents } from './SampleData';

//add to numbers
afterEach(cleanup);

describe('React clanader scheduler', () => {
  test('Event add to month ', () => {
    render(
      <ReactCalnaderScheduler calanderType="month" events={samepleEvents} />,
    );
    //ib__sc__month-date__bt-next
    expect(screen.getByText(samepleEvents[0].title)).toBeInTheDocument();
  });

  test('Event next prev button ', () => {
    let temp = [...samepleEvents];
    temp[0].title = new Date().getTime();
    render(<ReactCalnaderScheduler calanderType="month" events={temp} />);
    //ib__sc__month-date__bt-next
    const nextBtn = document.querySelector('.ib__sc__month-date__bt-next');
    const prevBtn = document.querySelector('.ib__sc__month-date__bt-prev');
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);
    expect(screen.getByText(temp[0].title)).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.queryByText(temp[0].title)).not.toBeInTheDocument();
  });
});
