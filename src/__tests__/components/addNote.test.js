import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { AddNote } from '../../components';
import renderer from 'react-test-renderer';

const mockStore = configureMockStore();

it('should render component correctly', () => {
  const store = mockStore([{ id: 1, time: '12:12:12', text: 'Here is a sample note. Add more notes to see your note above this.' }]);
  const tree = renderer.create(
    <Provider store={store}>
      <AddNote time='11:11:11' />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should not add note due to empty note submission', () => {
  const store = mockStore([{ id: 1, time: '12:12:12', text: 'Here is a sample note. Add more notes to see your note above this.' }]);
  const wrapper = mount(
    <Provider store={store}>
      <AddNote time='11:11:11' />
    </Provider>
  );
  wrapper.find('button').at(0).simulate('submit');
  const action = store.getActions();
  expect(action).toEqual([]);
});

it('should add note successfully', () => {
  const stopFn = jest.fn();
  const store = mockStore([{ id: 1, time: '12:12:12', text: 'Here is a sample note. Add more notes to see your note above this.' }]);
  const wrapper = mount(
    <Provider store={store}>
      <AddNote time='11:11:11' stopFn={stopFn} currentTimerStopId='2' />
    </Provider>
  );
  wrapper.find('textarea').simulate("change", { target: { value: "foo" } });
  wrapper.find('button').at(0).simulate('submit');
  wrapper.update();
  const action = store.getActions();
  expect(action).toEqual([{ type: 'ADD_NOTE', payload: { time: '11:11:11', text: 'foo' } }]);
});
