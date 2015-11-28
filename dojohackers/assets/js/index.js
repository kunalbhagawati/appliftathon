require('../css/app/main.css');

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var Predict = require('./PredictApp/app');
var Infer = require('./InferApp/app');


var Index = React.createClass({
    render: function() {
        return (
            <div className="row index-row center-block vertical-center">
                <Link to="predict"><button className="btn btn-primary button-entry" id="button-predict">Predict</button></Link>
                <Link to="infer"><button className="btn btn-primary  button-entry" id="button-infer">Infer</button></Link>
            </div>
        );
    }
});

var NoMatch = React.createClass({
    render: function() {
        return <h1>No match :p</h1>
    }
});

React.render((
  <Router>
    <Route path="/" component={Index} />
    <Route path="predict" component={Predict}/>
    <Route path="infer" component={Infer}/>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('index-container'));
