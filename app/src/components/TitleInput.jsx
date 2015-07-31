var React = require('react');

var TitleInput = React.createClass({
    getInitialState: function () {
        return {value: ''};
    },
    handleChange: function () {
        this.setState({value: event.target.value});
    },
    handleBlur: function () {
        if (this.state.value.length === 0) {
            this.setState({value: ''});
        }
    },
    render: function () {
        var value = this.state.value;
        return (
            <div className="form-group hovering-textarea-container">
                <input className="form-control input-lg" type="text" value={value} onChange={this.handleChange} onBlur={this.handleBlur} placeholder="输入调研主题"/>
            </div>
        );
    }
});

module.exports = TitleInput;
