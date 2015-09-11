import React, {Component, PropTypes} from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import QuestionTypePreview from './QuestionTypePreview';
import QuestionActions from '../actions/QuestionActions';

export default class QuestionTypeSelector extends Component {
    static propTypes = {
      onSave: PropTypes.func.isRequired,
      typeList: PropTypes.arrayOf(PropTypes.string).isRequired,
      qid: PropTypes.string.isRequired
    }

    state = { selection: this.props.typeList[0] };

    _handleSelect = (index) => {
        this.setState({selection: index});
        QuestionActions.update(this.props.qid, {questionType: index, placeholderText:''});
    }

    render() {
        let itemList = (this.props.typeList.map(function (element, index) {
            return (
                <MenuItem eventKey={element} key={index}>{element}</MenuItem>
            );
        }));
        return (
            <div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">问题类型</label>
                    <div className="col-sm-8">
                        <DropdownButton bsStyle="primary" title={this.state.selection} onSelect={this._handleSelect}>
                            {itemList}
                        </DropdownButton>
                    </div>

                </div>

                <QuestionTypePreview selectedType={this.state.selection} typeList={this.props.typeList} onSave={this.props.onSave} qid={this.props.qid}/>
            </div>
        );
    }
}
