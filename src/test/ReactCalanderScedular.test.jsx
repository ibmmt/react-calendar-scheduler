import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ReactCalnaderScheduler from '../ReactCalanderScheduler';
import { samepleEvents } from './SampleData';

//add to numbers
afterEach(cleanup);

describe('React clanader scheduler', () => {
  test('Event add to week ', () => {
    render(
      <ReactCalnaderScheduler calanderType="week" events={samepleEvents} />,
    );
    expect(screen.getByText(samepleEvents[0].title)).toBeInTheDocument();
  });
  test('Switch Calander ', () => {
    render(
      <ReactCalnaderScheduler calanderType="week" events={samepleEvents} />,
    );

    const weekBtn = document.querySelector('.ib_sc_btn_week');
    const monthBtn = document.querySelector('.ib_sc_btn_month');
    const dayBtn = document.querySelector('.ib_sc_btn_day');
    expect(weekBtn).toBeInTheDocument();
    expect(monthBtn).toBeInTheDocument();
    expect(dayBtn).toBeInTheDocument();

    fireEvent.click(weekBtn);
    expect(document.querySelector('.ib_sc_type_week')).toBeInTheDocument();
    fireEvent.click(monthBtn);
    expect(document.querySelector('.ib_sc_type_month')).toBeInTheDocument();
    fireEvent.click(dayBtn);
    expect(document.querySelector('.ib_sc_type_day')).toBeInTheDocument();
  });
});
