var React = require('react');

var MultilineText = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        };
    },
    render: function() {
        return (
            <textarea
                className="form-control"
                rows="5"
                placeholder="输入提示"
                onChange={this._onChange}
                onBlur={this._onSave}
            />
        );
    },

    _onSave: function () {
        this.props.onSave(this.props.qid, {placeholder_text: this.state.value});
    },

    _onChange: function (event) {
        this.setState({
            value: event.target.value
        });
    }
});

module.exports = MultilineText;
