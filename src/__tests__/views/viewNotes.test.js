import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import { ViewNotes } from '../../views';
import renderer from 'react-test-renderer';

const mockStore = configureMockStore();

it('should view single note with sample', () => {
  const store = mockStore([{ id: 1, time: '12:12:12', text: 'Here is a sample note. Add more notes to see your note above this.' }]);
  const tree = renderer.create(
    <Provider store={store}>
      <ViewNotes time='11:11:11' />
    </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should view single note without sample', () => {
  const store = mockStore([]);
  const tree = renderer.create(
    <Provider store={store}>
      <ViewNotes time='11:11:11' />
    </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
