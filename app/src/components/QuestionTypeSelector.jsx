var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var ReactPropTypes = React.PropTypes;
var MenuItem = require('react-bootstrap/lib/MenuItem');
var QuestionTypePreview = require('./QuestionTypePreview');
var QuestionActions = require('../actions/QuestionActions');

var QuestionTypeSelector = React.createClass({
    propTypes: {
      onSave: ReactPropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            selection: this.props.list[0],
        };
    },
    handleSelect: function (index) {
        this.setState({selection: index});
        QuestionActions.update(this.props.qid, {question_type: index, placeholder_text:''});
    },
    render: function  () {
        var itemList = (this.props.list.map(function (element, index) {
            return (
                <MenuItem eventKey={element} key={index}>{element}</MenuItem>
            );
        }));
        return (
            <div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">问题类型</label>
                    <div className="col-sm-8">
                        <DropdownButton bsStyle="primary" title={this.state.selection} onSelect={this.handleSelect}>
                            {itemList}
                        </DropdownButton>
                    </div>

                </div>

                <QuestionTypePreview type={this.state.selection} list={this.props.list} onSave={this.props.onSave} qid={this.props.qid}/>
            </div>
        );
    }
});

module.exports = QuestionTypeSelector;
