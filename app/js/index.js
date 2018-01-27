import React from 'react';
import ReactDOM from 'react-dom';
import Parent from './components/Parent.js';

ReactDOM.render(
  <h1>So long and thanks for all the fish!</h1>,
  document.getElementById('root')
);

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);
