import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo.js';
import Latest from './containers/Latest.js';
import Mode from './components/Mode.js';
import Author from './components/Author.js';

ReactDOM.render(
  <div>
  <div id="left-pane">
  Here will go the graph
  </div>
  <div id="right-pane">
    <Logo />
    <Latest />
  </div>
  </div>,
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
