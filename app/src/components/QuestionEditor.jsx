var React = require('react');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var QuestionTypeSelector = require('./QuestionTypeSelector');
var QuestionActions = require('../actions/QuestionActions');
var QuestionType = require('../constants/QuestionType');

var QuestionEditor = React.createClass({
    render: function () {
        var displayName = [];
        for (var key in QuestionType){
            displayName.push(QuestionType[key]);
        }

        return (
            <div className="container-editor">
                <div className="form-group">
                    <label className="control-label col-sm-2">问题</label>
                    <div className="col-sm-8">
                        <input className="form-control" type="text" placeholder="输入问题" />
                    </div>
                    <div className="col-sm-1 col-sm-offset-1">
                         <Button onClick={this._onDestoryClick}><Glyphicon className="st-top-align" glyph={'trash'}/></Button>
                    </div>
                </div>

                <QuestionTypeSelector list={displayName}/>
            </div>
        );
    },

    _onDestoryClick: function () {
        QuestionActions.destroy(this.props.question.id);
    },
});

module.exports = QuestionEditor;
