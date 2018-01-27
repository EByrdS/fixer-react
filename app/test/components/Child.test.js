/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import Child from '../../js/components/Child.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Child name="child" />, div);
});

it('Containts specific test', () => {
  const wrapper = shallow(<Child name="child" />);
  expect(wrapper.text()).toBe("and this is the child.");
});
