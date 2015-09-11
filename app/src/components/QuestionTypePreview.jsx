import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import SinglelineText from './SinglelineText';
import MultilineText from './MultilineText';

export default class QuestionTypePreview extends Component {
    static propTypes = {
      onSave: PropTypes.func.isRequired,
      selectedType: PropTypes.string.isRequired,
      typeList: PropTypes.arrayOf(PropTypes.string).isRequired,
      qid: PropTypes.string.isRequired
    }

    render() {
        let previewElement;

        switch (this.props.selectedType){
            case this.props.typeList[0]:
                previewElement = <SinglelineText onSave={this.props.onSave} qid={this.props.qid}/>;
                break;
            case this.props.typeList[1]:
                previewElement = <MultilineText onSave={this.props.onSave} qid={this.props.qid}/>;
                break;

            case this.props.typeList[2]:
                previewElement = <input className="form-control" type="text" placeholder="输入问题" />;
                break;
            case this.props.typeList[3]:
                previewElement = <input className="form-control" type="text" placeholder="输入问题" />;
                break;
            case this.props.typeList[4]:
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
}
