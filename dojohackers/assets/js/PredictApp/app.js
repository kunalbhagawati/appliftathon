var React = require('react');
var $ = require('jQuery');


module.exports = React.createClass({
    postFile: function() {
        $.ajax()
    },

    renderValuesForm: function() {
        return null;
    },

    renderFileUploadField: function() {
        return <input type="file" onchange={this.postFile} />;
    },

    renderInputTypes: function() {
        return (
            <div>
                {this.renderValuesForm()}
                {this.renderFileUploadField()}
            </div>
        )
    },

    render: function() {
        return this.renderInputTypes();
    }
});
