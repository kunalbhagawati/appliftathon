var React = require('react');
var $ = require('jQuery');
var _ = require('underscore');


require('../../css/app/button.css');
require('../../css/app/predict/predict.less');


module.exports = React.createClass({
    getInitialState: function() {
        return {
            is_input_file: true,
            predictions: null
        }
    },

    postFile: function(e) {
        self = this;
        var firstLine,
            isValidFormat=true,
            file = e.target.files[0],
            fileReader = new FileReader();

        fileReader.onload = function(e) {
            var contents = e.target.result;
            if (file.type != 'csv') {
                isValidFormat = false
            }
            firstLine = contents.substr(1, contents.indexOf("\n"));
        };
        //fileReader.onloadend = function() {
        //    debugger;
        //};
        fileReader.readAsText(file);
        var data = new FormData();
        data.append('sample_file', file);
        // attempt to populate the first row
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

    renderPredictions: function () {
        return (
            <div className="prediction-row-container row">
                <div className="prediction-header row">
                    <span className="prediction-header-cell col-lg-1">Hash</span>
                    <span className="prediction-header-cell col-lg-1">Value</span>
                </div>
                {_.map(this.state.predictions, function(value, key, list) {
                    return (
                        <div className="prediction-row row">
                            <span className="prediction-key col-lg-1">{key}</span>
                            <span className="prediction-value col-lg-1">{value}</span>
                        </div>
                    );
                })}
            </div>
        );
    },

    renderContent: function() {
        return this.state.predictions === null ? null : this.renderPredictions();
    },

    render: function() {
        return (
            <div>
                <div className="form-container">
                    {this.renderInputType()}
                </div>
                <hr className="dashed"/>
                <div className="content-container row">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
});
