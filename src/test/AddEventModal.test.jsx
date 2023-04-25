import '@testing-library/jest-dom';
import { cleanup, prettyDOM, render, screen } from '@testing-library/react';
import ReactCalnaderScedular from '../ReactCalanderScedular';

//add to numbers
afterEach(cleanup);

describe('AddEventModal', () => {
  const { container } = render(<ReactCalnaderScedular calanderType="week" />);
  const { firstChild } = container;
  test('renders correctly', () => {
    console.log('firstChild', prettyDOM(firstChild));
    expect(container).toHaveTextContent(`Week`);

    //expect(container).toHaveClass(`ib__sc__table-hr-box-week`);
  });

  test('should render AddEventModal', () => {
    const { container } = render(<ReactCalnaderScedular calanderType="week" />);
    expect(container).toBeVisible();

    const addEventButton = screen.getByText('10-25/04/2023');
    console.log('addEventButton', prettyDOM(addEventButton));
    // fireEvent.click(addEventButton);
    expect(screen.getByText('Add Event')).toBeInTheDocument();

    //const test = container.querySelector('.ib__sc__table-td');
    // console.log(
    //   'getElementsByClassName===============',
    //   container.getBy('.ib__sc__table-hr-box-week'),
    // );
    // console.log(test);
    // const component = document.querySelectorAll('.ib__sc__table-hr-box-week');

    // if (component[10] && component[10].isVisible()) {
    //   fireEvent.click(component[10]);
    //   expect(screen.getByText('Add 66Event')).toBeInTheDocument();
    // }

    // const rows = component.querySelector('.ib__sc__table-hr-box-week');
    // setTimeout(() => {
    //   fireEvent.click(component[10]);
    //   expect(screen.getByText('Add 66Event')).toBeInTheDocument();
    // }, 1000);
    // console.log('££££££££££££££££££££££££££', prettyDOM(component[10]));

    expect(screen.getByText('Month')).toBeInTheDocument();

    //
  });
});

// const { container } = render(<ReactCalnaderScedular calanderType="week" />);

// console.log('rows', rows);
// const row4 = rows[3]; // index 3 corresponds to the 4th row (arrays are 0-indexed)
// const cell5 = row4.querySelector('td:nth-child(5)'); // select the 5th cell in the row (index 4)
// expect(cell5).toBeInTheDocument();

//console.log('""""""""""component==', component);
