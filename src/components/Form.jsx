var React = require('react');
var TitleInput = require('./TitleInput');
var QuestionList = require('./QuestionList');

var Form = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
    },
    render: function () {
        return(
            <form className="editorForm" encType='multipart/form-data'
 onSubmit={this.handleSubmit}>
                <TitleInput />
                <div className="form-group">
                    <textarea className="form-control" rows="5" placeholder="调研简介(用户可以看到)"/>
                </div>
                <div className="form-horizontal">
                    <QuestionList />
                </div>
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

module.exports = Form;
