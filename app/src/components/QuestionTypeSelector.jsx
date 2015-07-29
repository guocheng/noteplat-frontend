var React = require('react');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var QuestionTypePreview = require('./QuestionTypePreview');

var QuestionTypeSelector = React.createClass({
    getInitialState: function () {
        return {
            selection: this.props.list[0],
        };
    },
    handleSelect: function (index) {
        this.setState({selection: index});
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
                <QuestionTypePreview type={this.state.selection} list={this.props.list} />
            </div>
        );
    }
});

module.exports = QuestionTypeSelector;
