var React = require('react');
var Header = require('./components/header');
var ContentContainer = require('./components/ContentContainer');


module.exports = React.createClass(
    {
        render: function () {
            return (
                <div>
                    <div id="header-container"><Header/></div>
                    <div id="content-container"><ContentContainer/></div>
                </div>
            );
        }
    }
);
