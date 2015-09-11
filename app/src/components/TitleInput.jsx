import React, {Component} from 'react';

export default class TitleInput extends Component{

    state = {value: ''};

    _handleChange = () => {
        this.setState({value: event.target.value});
    }

    _handleBlur = () => {
        if (this.state.value.length === 0) {
            this.setState({value: ''});
        }
    }

    render() {
        return (
            <div className="form-group hovering-textarea-container">
                <input className="form-control input-lg" type="text" value={this.state.value} onChange={this._handleChange} onBlur={this._handleBlur} placeholder="输入调研主题"/>
            </div>
        );
    }
}
