var React = require('react');
var TitleInput = require('./TitleInput');
var QuestionList = require('./QuestionList');

var Form = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
    },
    render: function () {
        return(
            <div className="container">
                <div className="row col-sm-offset-1 col-md-10 col-md-offset-1">
                    <form className="editorForm" encType='multipart/form-data'
         onSubmit={this.handleSubmit}>
                        <TitleInput />
                        <div className="form-group">
                            <textarea className="form-control" rows="5" placeholder="调研简介(用户可以看到)"/>
                        </div>
                        <div className="form-horizontal">
                            <QuestionList />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = Form;
