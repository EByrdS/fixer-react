'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Child = _react2.default.createClass({
  displayName: 'Child',

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      'and this is the ',
      _react2.default.createElement(
        'b',
        null,
        this.props.name
      ),
      '.'
    );
  }
});

exports.default = Child;