var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var ReactPropTypes = React.PropTypes;
var SinglelineText = require('./SinglelineText');
var MultilineText = require('./MultilineText');


var QuestionTypePreview = React.createClass({
    propTypes: {
      onSave: ReactPropTypes.func.isRequired
    },
    render: function () {
        var previewElement;

        switch (this.props.type){
            case this.props.list[0]:
                previewElement = <SinglelineText onSave={this.props.onSave} qid={this.props.qid}/>;
                break;
            case this.props.list[1]:
                previewElement = <MultilineText onSave={this.props.onSave} qid={this.props.qid}/>;
                break;

            case this.props.list[2]:
                previewElement = <input className="form-control" type="text" placeholder="输入问题" />;
                break;
            case this.props.list[3]:
                previewElement = <input className="form-control" type="text" placeholder="输入问题" />;
                break;
            case this.props.list[4]:
                previewElement = <Button bsStyle="primary" bsSize="medium" disabled={true}>上传照片</Button>;
                break;
        }

        return (
            <div className="form-group">
                <label className="col-sm-2 control-label">&nbsp;</label>
                <div className="col-sm-8">
                    {previewElement}
                </div>
            </div>
        );
    }
});

module.exports = QuestionTypePreview;
