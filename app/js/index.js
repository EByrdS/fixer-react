import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo.js';
import Mode from './components/Mode.js';
import Author from './components/Author.js';

ReactDOM.render(
  <Logo />,
  document.getElementById('root')
);

ReactDOM.render(
  <div>
    <Mode />
    <div id="description">
    A React app that displays a summary of FX rates
    </div>
    <Author />
  </div>,
  document.getElementById('app-footer')
);
