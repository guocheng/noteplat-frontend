import React from 'react';

export default class TitleInput extends React.Component{
    constructor(){
        super();
        this.state = {value: ''};
    }

    handleChange = () => {
        this.setState({value: event.target.value});
    }

    handleBlur = () => {
        if (this.state.value.length === 0) {
            this.setState({value: ''});
        }
    }

    render() {
        return (
            <div className="form-group hovering-textarea-container">
                <input className="form-control input-lg" type="text" value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} placeholder="输入调研主题"/>
            </div>
        );
    }
}
