import React from 'react';
import { mount } from 'enzyme'
import { Timer } from '../../components';
import renderer from 'react-test-renderer';

it('should render component correctly', () => {
  const tree = renderer.create(
  <Timer time='12:12:12' startFn={f => f} resetFn={f => f} stopFn={f => f} currentTimerStopId={1} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render timer face', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();
  const wrapper = mount(<Timer time='12:12:12' startFn={mockFn1} resetFn={mockFn2} stopFn={mockFn3} currentTimerStopId={1} />);
  expect(wrapper.find('.timerFace').exists()).toBe(true);
});

it('should control timer successfully', () => {
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  const mockFn3 = jest.fn();
  const wrapper = mount(<Timer time='12:12:12' startFn={mockFn1} resetFn={mockFn2} stopFn={mockFn3} currentTimerStopId={1} />);
  
  wrapper.find('button').at(0).simulate('click');
  expect(mockFn1).toHaveBeenCalled();

  wrapper.find('button').at(1).simulate('click');
  expect(mockFn3).toHaveBeenCalled();

  wrapper.find('button').at(2).simulate('click');
  expect(mockFn2).toHaveBeenCalled();

  expect(wrapper.find('.timerFace').exists()).toBe(true);
});
