var React = require('react');
var $ = require('jQuery');
var _ = require('underscore');


require('../../css/app/button.css');


module.exports = React.createClass({
    getInitialState: function() {
        return {
            is_input_file: true,
            predictions: null
        }
    },

    postFile: function(e) {
        self = this;
        var data = new FormData();
        data.append('sample_file', e.target.files[0]);
        $.ajax({
            type: "POST",
            url: 'api/predict/',
            data: data,
            contentType: false,
            processData: false,

            success: function(response) {
                self.setState({
                    'predictions': response
                });
            }
        });
    },

    renderValuesForm: function() {
        return null;
    },

    renderFileUploadField: function() {

        return (
            <span className="btn btn-default btn-file">Browse
                <input id="predict-input-file" type="file" onChange={this.postFile} />
            </span>
        );
    },

    renderInputType: function() {
        return this.state.is_input_file ?
            <form id="form-send-file">{this.renderFileUploadField()}</form> :
            <form id="form-send-fields">{this.renderValuesForm()}</form>;
    },

    renderPredictions: function() {
        return (_.map(this.state.predictions, function(value, key, list) {
                return <div><span>{key}</span><span>{value}</span></div>;
            }));
    },

    renderContent: function() {
        return this.state.predictions === null ? null : this.renderPredictions();
    },

    render: function() {
        return (
            <div>
                {this.renderInputType()}
                {this.renderContent()}
            </div>
        );
    }
});
