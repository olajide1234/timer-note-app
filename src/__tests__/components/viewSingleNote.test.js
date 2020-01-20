import React from 'react';
import { mount } from 'enzyme'
import { ViewSingleNote } from '../../components';
import renderer from 'react-test-renderer';

it('should render component correctly', () => {
  const tree = renderer.create(
  <ViewSingleNote id={2} time='12:12:12' text='Test text' deleteFn={f=>f} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should request to delete current note', () => {
  const mockFn = jest.fn();
  const wrapper = mount(<ViewSingleNote id={2} time='12:12:12' text='Test text' deleteFn={mockFn} />);
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.find('.smallerTopMargin').exists()).toBe(true);
});
