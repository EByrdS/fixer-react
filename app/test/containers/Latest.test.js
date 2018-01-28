/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import Latest from '../../js/containers/Latest.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Latest />, div);
});

test('Contains Graph h2', () => {
  const wrapper = shallow(<Latest />);
  expect(wrapper.find("#graph-selection h2")).toBeTruthy();
  expect(wrapper.find("#graph-selection h2").text()).toBe("Graph");
});

test('Contains Today h2', () => {
  const wrapper = shallow(<Latest />);
  expect(wrapper.find("#latest-list h2")).toBeTruthy();
  expect(wrapper.find("#latest-list h2").text()).toBe("Latest");
});
