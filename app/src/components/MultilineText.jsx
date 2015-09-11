import React, {Component, PropTypes} from 'react';

export default class MultilineText extends Component{
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        qid: PropTypes.string.isRequired
    }

    state = {value: ''};

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
            <textarea
                className="form-control"
                rows="5"
                placeholder="输入提示"
                onChange={this._onChange}
                onBlur={this._onSave}
            />
        );
    }
}
