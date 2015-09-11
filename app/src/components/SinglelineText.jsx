import React, {Component, PropTypes} from 'react';

export default class SinglelineText extends Component{
    static propTypes = {
        qid: PropTypes.string.isRequired,
        onSave: PropTypes.func.isRequired
    }

    state = { value: '' };

    _onSave = () => {
        this.props.onSave(this.props.qid, {placeholderText: this.state.value});
    }

    _onChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <input
                className="form-control"
                type="text"
                placeholder="输入提示"
                onChange={this._onChange}
                onBlur={this._onSave}
            />
        );
    }
}
