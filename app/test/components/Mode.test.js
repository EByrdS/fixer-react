/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import Mode from '../../js/components/Mode.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mode />, div);
});

test('Displays correct mode', () => {
  const wrapper = shallow(<Mode />);
  expect(wrapper.text()).toBe("Running in test mode");
});
