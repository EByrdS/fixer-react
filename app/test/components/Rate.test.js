/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import Rate from '../../js/components/Rate.js';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rate base="USD"  quote="MXN"/>, div);
});
