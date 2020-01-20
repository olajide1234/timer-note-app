import React from 'react';
import { Provider } from 'react-redux'
import { WithTimer } from '../../views';
import { startTimer, resetTimer } from '../../views/WithTimer';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore();

it('should render timer correctly', () => {
  const store = mockStore([{ id: 1, time: '12:12:12', text: 'Here is a sample note. Add more notes to see your note above this.' }]);

  const tree = renderer.create(
    <Provider store={store}>
      <WithTimer />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should update timer correctly', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();
  const mockFn4 = jest.fn();

  jest.useFakeTimers();

  startTimer(mockFn1, mockFn2, mockFn3, mockFn4, 1, 11, 60);
  expect(setTimeout).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(1000);
  startTimer(mockFn1, mockFn2, mockFn3, mockFn4, 1, 60, 60);
  expect(mockFn2).toHaveBeenCalled();
  jest.advanceTimersByTime(1000);

  jest.advanceTimersByTime(1000);
  startTimer(mockFn1, mockFn2, mockFn3, mockFn4, 12, 60, 60)
  expect(mockFn1).toHaveBeenCalled();
  jest.advanceTimersByTime(1000);

  jest.advanceTimersByTime(1000);
  startTimer(mockFn1, mockFn2, mockFn3, mockFn4, 0, 6, 59)
  expect(mockFn2).toHaveBeenCalled();
  jest.advanceTimersByTime(1000);
});

it('should reset timer', () => {
  const mockFn = jest.fn();
  expect(resetTimer(2, mockFn, mockFn, mockFn)).toMatchSnapshot();
});
