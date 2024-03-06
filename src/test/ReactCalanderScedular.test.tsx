import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ReactCalendarScheduler from '../lib/ReactCalendarScheduler';
import { samepleEvents } from './SampleData';
afterEach(cleanup);
React.useLayoutEffect = React.useEffect;

afterEach(cleanup);

describe('React clanader scheduler', () => {
  test('Event add to week ', () => {
    render(
      <ReactCalendarScheduler calenderType="week" events={samepleEvents} />,
    );
    expect(screen.getByText(samepleEvents[0].title)).toBeInTheDocument();
  });
  test('Switch Calender ', () => {
    render(
      <ReactCalendarScheduler calenderType="week" events={samepleEvents} />,
    );

    const weekBtn = document.querySelector('.ib_sc_btn_week');
    const monthBtn = document.querySelector('.ib_sc_btn_month');
    const dayBtn = document.querySelector('.ib_sc_btn_day');
    expect(weekBtn).toBeInTheDocument();
    expect(monthBtn).toBeInTheDocument();
    expect(dayBtn).toBeInTheDocument();
    if (weekBtn) fireEvent.click(weekBtn);
    expect(document.querySelector('.ib_sc_type_week')).toBeInTheDocument();
    if (monthBtn) fireEvent.click(monthBtn);
    expect(document.querySelector('.ib_sc_type_month')).toBeInTheDocument();
    // fireEvent.click(dayBtn);
    // expect(document.querySelector('.ib_sc_type_day')).toBeInTheDocument();
  });
});
