/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from '../../js/components/Logo.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Logo />, div);
});

test('Contains fixer-react text', () => {
  const wrapper = shallow(<Logo />);
  expect(wrapper.text()).toBe("fixer-react");
});

test('Has classname logo', () => {
  const wrapper = shallow(<Logo />);
  expect(wrapper.hasClass('logo')).toBe(true);
});
