var React = require('react');
var $ = require('jQuery');
var _ = require('underscore');
var ReactDom = require('react-dom');

require('../../css/app/button.css');
require('../../css/app/predict/predict.less');
require('../../css/app/predict/loader.less');


module.exports = React.createClass({
    getInitialState: function() {
        return {
            is_input_file: true,
            predictions: null
        }
    },

    postFile: function(e) {
        self = this;

        var spinner = '<div class="browser-screen-loading-content"> ' +
            '<div class="loading-dots dark-gray"> ' +
            '<i></i> ' +
            '<i></i> ' +
            '<i></i> ' +
            '<i></i> ' +
            '</div> ' +
            '</div>';
        $('.content-container').html(spinner);      // hack for lack of time

        var firstLine,
            isValidFormat=true,
            file = $("#predict-input-file")[0].files[0],
            predictionType = $('#predict-input-type').val(),
            fileReader = new FileReader();

        //fileReader.onload = function(e) {
        //    var contents = e.target.result;
        //    if (file.type != 'csv') {
        //        isValidFormat = false
        //    }
        //    firstLine = contents.substr(1, contents.indexOf("\n"));
        //};
        //fileReader.onloadend = function() {
        //    debugger;
        //};
        //fileReader.readAsText(file);
        var data = new FormData();
        data.append('sample_file', file);
        data.append('prediction_type', predictionType);
        // attempt to populate the first row
        $.ajax({
            type: "POST",
            url: 'api/predict/',
            data: data,
            contentType: false,
            processData: false,

            success: function(response) {
                $('.browser-screen-loading-content').remove();
                self.setState({
                    'predictions': response
                });
            }
        });
    },

    renderValuesForm: function() {
        return null;
    },

    renderFileUploadField: function () {
        return (
            <div className="input-group-file row">
                <span className="btn btn-default btn-file form-control">Browse File
                    <input id="predict-input-file" type="file"/>
                </span>
                <select className="form-control" id="predict-input-type">
                    <option value="ExchangeBid">ExchangeBid</option>
                    <option value="Outcome">Outcome</option>
                </select>
                <button className="btn btn-primary form-control" onClick={this.postFile}>Submit</button>
            </div>
        );
    },

    renderInputType: function() {
        return this.state.is_input_file ?
            <form id="form-send-file" className="form-inline">{this.renderFileUploadField()}</form> :
            <form id="form-send-fields">{this.renderValuesForm()}</form>;
    },

    renderPredictions: function () {
        return (
            <div className="table-responsive" id="prediction-results">
                <table className="table-condensed table-hover table-condensed">
                    <thead>
                    <tr className="prediction-header row">
                        <td className="prediction-header-cell col-md-6">Hash</td>
                        <td className="prediction-header-cell col-md-6">Value</td>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(
                        this.state.predictions, function (value, key, list) {
                            return (
                                <tr className="prediction-row row prediction-row-container">
                                    <td className="prediction-key col-md-6">{key}</td>
                                    <td className="prediction-value col-md-6">{value}</td>
                                </tr>
                            );
                        }
                    )}
                    </tbody>
                </table>
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
                <div className="content-container row" id="content-container">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
});
