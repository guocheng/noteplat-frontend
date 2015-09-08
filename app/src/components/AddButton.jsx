import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

let {Component, PropTypes} = React;

export default class AddButton extends Component {
    static propTypes = {
        onClick: PropTypes.func
    }

    render() {
       return (
           <Button className="st-add-button" bsStyle={'primary'} bsSize={'large'} block={true} onClick={this.props.onClick}><Glyphicon className="st-top-align" glyph={'plus-sign'}/> 添加新问题 </Button>
       );
    }
}
