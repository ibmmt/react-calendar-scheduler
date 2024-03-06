import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactCalendarScheduler from '../lib/ReactCalendarScheduler';
import { samepleEvents } from './SampleData';

afterEach(cleanup);
React.useLayoutEffect = React.useEffect;

describe('React clanader scheduler', () => {
  //console.log(React)
  test('Event add to week ', () => {
    render(
      <ReactCalendarScheduler calenderType="week" events={samepleEvents} />,
    );

    expect(screen.getByText(samepleEvents[0].title)).toBeInTheDocument();
  });

  test('Event next prev button ', () => {
    const temp = [...samepleEvents];
    temp[0].title = 'title' + new Date().getTime();
    render(<ReactCalendarScheduler calenderType="week" events={temp} />);

    const nextBtn = document.querySelector('.ib__sc__week-date__bt-next');
    const prevBtn = document.querySelector('.ib__sc__week-date__bt-prev');
    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();
    if (prevBtn) fireEvent.click(prevBtn);
    if (nextBtn) fireEvent.click(nextBtn);
    expect(screen.getByText(temp[0].title)).toBeInTheDocument();
    if (nextBtn) fireEvent.click(nextBtn);
    expect(screen.queryByText(temp[0].title)).not.toBeInTheDocument();
  });
});
