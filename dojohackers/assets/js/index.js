var React = require('react');
var App = require('./app/app.js');

require('../vendor/bootstrap-3.3.6-dist/css/bootstrap.css');
require('../css/app/main.css');


React.render(<App/>, document.getElementById('app-container'));
