var React = require('react');
var Filters = require('./content/filters');
var Contentbox = require('./content/contentbox');

module.exports = React.createClass(
    {
        render: function () {
            return (
                <div>
                    <Filters />
                    <Contentbox />
                </div>
            );
        }
    }
);
