/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import Author from '../../js/components/Author.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Author />, div);
});

test('Contains link to repo', () => {
  const wrapper = shallow(<Author />);
  const url = 'https://github.com/EByrdS/fixer-react';
  expect(wrapper.find({ url: url })).toBeDefined();
});

test('Contains gravatar img', () => {
  const wrapper = shallow(<Author />);
  expect(wrapper.find('img')).toBeDefined();
  expect(wrapper.find('img').prop('src')).toContain('gravatar.com');
});
