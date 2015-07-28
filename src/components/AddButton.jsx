var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var AddButton = React.createClass({
    render: function() {
        return (
            <Button className="st-add-button" bsStyle={'primary'} bsSize={'large'} block={true} onClick={this.props.onClick}><Glyphicon className="st-top-align" glyph={'plus-sign'}/> 添加新问题 </Button>
        );
    },
});

module.exports = AddButton;
