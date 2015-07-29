var React = require('react');
var Button = require('react-bootstrap/lib/Button');

var QuestionTypePreview = React.createClass({
    render: function () {
        var previewElement;

        switch(this.props.type){
            case this.props.list[0]:
                previewElement = <input className="form-control" type="text" placeholder="输入提示" />;
                break;
            case this.props.list[1]:
                previewElement = <textarea className="form-control" rows="5" placeholder="输入提示"/>;
                break;

            case this.props.list[2]:
                previewElement = <input className="form-control" type="text" placeholder="输入问题" />;
                break;
            case this.props.list[3]:
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
