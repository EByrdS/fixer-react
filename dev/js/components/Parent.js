'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Child = require('./Child.js');

var _Child2 = _interopRequireDefault(_Child);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parent = _react2.default.createClass({
  displayName: 'Parent',

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        ' This is the parent. '
      ),
      _react2.default.createElement(_Child2.default, { name: 'child' })
    );
  }
});

exports.default = Parent;