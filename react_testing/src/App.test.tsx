// render method creates a virtual DOM for whatever JSX we pass as an argument - App
// we want to render App component

// screen is global object to access virtual DOM
// We are going to use global object Screen that has access to virtual DOM created by render method.
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

import { mocked } from 'ts-jest/utils';
import { getUser } from './get-user';

// mocking axios instance
// if axios api fails, all our tests fails as well when getting data from the server
// avoiding making api calls to the server, saves time & money
jest.mock('./get-user');
const mockGetUser = mocked(getUser, true); // true is make deep mock

describe('when rendering App component', () => {
  beforeEach(async () => {
    render(<App />);
    // When in need to wait for any period of time you can use 'waitFor'
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  });

  test('Should render the App component without crashing', () => {
    screen.debug();
  });

  test('Should select the Children prop that is being passed to the CustomInput component', () => {
    expect(screen.getByText('Input:')).toBeInTheDocument();
  });

  test('Should select Input element by its role', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('Should select a Label element by its text', () => {
    expect(screen.getByLabelText('Input:')).toBeInTheDocument();
  });

  test('Should select a Label element by its placeholder text', () => {
    expect(screen.getByPlaceholderText('enter text')).toBeInTheDocument();
  });

  test('Should not find the role `whatever` in our component', () => {
    expect(screen.queryByRole('whatever')).toBeNull();
  });
});

describe('when the component fetches user successfully', () => {
  beforeEach(() => {
    // clear the mock/promise
    mockGetUser.mockClear();
  });

  test('Should call getUser once', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });
});

// // mocking axios instance if axios api fails, all our tests fails as well
// // using this mock data instead of api returned data
// jest.mock('axios', () => ({
//   // mocking http get request
//   get: () => {
//     return {
//       data: [
//         {
//           id: 1,
//           userId: 1,
//           title: 'Do some work',
//           completed: false,
//         },
//         {
//           id: 2,
//           userId: 1,
//           title: 'Learn Jest',
//           completed: true,
//         },
//       ],
//     };
//   },
// }));

// // grouping tests for App component
// describe('App', () => {
//   it('renders', async () => {
//     render(<App />);

//     expect(screen.getByText(/hello world!/i)).toBeTruthy();

//     // mock button click
//     userEvent.click(screen.getByRole('button', { name: /change text/i }));
//     expect(await screen.findByText('New text')).toBeTruthy();
//   });

//   it('fetches data', async () => {
//     render(<App />);
//     expect(await screen.findAllByTestId('todo')).toHaveLength(2);
//   });

//   it('filters completed todos', async () => {
//     render(<App />);
//     userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
//     expect(await screen.findAllByTestId('todo')).toHaveLength(1);
//   });
// });
