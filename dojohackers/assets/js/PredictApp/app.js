var React = require('react');
var $ = require('jQuery');


module.exports = React.createClass({
    postFile: function(e) {
        var data = new FormData();
        data.append('sample_file', e.target.files[0]);
        $.ajax({
            type: "POST",
            url: 'api/predict/',
            data: data,
            contentType: false,
            processData: false,

            success: function(response) {
                console.log(response);
            }
        });
    },

    renderValuesForm: function() {
        return null;
    },

    renderFileUploadField: function() {
        return <input id="predict-input-file" type="file" onChange={this.postFile} />;
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
