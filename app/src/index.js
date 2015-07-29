var React = require('react');
var Form = require('./components/Form.jsx');
var Normalize = require('../../node_modules/normalize.css/normalize.css');
var Bootstrap  = require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
var Main  = require('../css/main.css');

React.render(
    <Form />,
    document.getElementById('app')
);
