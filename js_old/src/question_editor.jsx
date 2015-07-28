var TitleInput = React.createClass({
    getInitialState: function () {
        return {value: ""};
    },
    handleChange: function () {
        this.setState({value: event.target.value});
    },
    handleBlur: function () {
        if(this.state.value.length === 0) {
            this.setState({value: ""});
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

var QuestionEditor = React.createClass({
    render: function () {
        var Input = ReactBootstrap.Input;
        var Button = ReactBootstrap.Button;
        var Glyphicon = ReactBootstrap.Glyphicon;
        return (
            <div className="container-editor">
                <div className="form-group">
                    <label className="control-label col-sm-2">问题</label>
                    <div className="col-sm-8">
                        <input className="form-control" type="text" placeholder="输入问题" />
                    </div>
                    <div className="col-sm-1 col-sm-offset-1">
                         <Button onClick={this.props.onClick}><Glyphicon className="st-top-align" glyph={'trash'}/></Button>
                    </div>
                </div>

                <QuestionTypeSelector list={['单行文字', '段落', '多选', '照片']}/>
            </div>
        );
    }
});

var QuestionTypeSelector = React.createClass({
    getInitialState: function () {
        return {
            selection: this.props.list[0],
        };
    },
    handleSelect: function (index) {
        this.setState({selection: index});
    },
    render: function  () {
        var DropdownButton = ReactBootstrap.DropdownButton;
        var MenuItem = ReactBootstrap.MenuItem;
        var itemList = (this.props.list.map(function (element, index) {
            return (
                <MenuItem eventKey={element} key={index}>{element}</MenuItem>
            );
        }));

        return (
            <div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">问题类型</label>
                    <div className="col-sm-8">
                        <DropdownButton bsStyle="primary" title={this.state.selection} onSelect={this.handleSelect}>
                            {itemList}
                        </DropdownButton>
                    </div>

                </div>
                <QuestionTypePreview type={this.state.selection} list={this.props.list} />
            </div>
        );
    }
});

var QuestionTypePreview = React.createClass({
    render: function () {
        var previewElement;

        switch(this.props.type){
            case this.props.list[0]:
                previewElement = <input className="form-control" type="text" placeholder="输入提示" />;
                break;
            case this.props.list[1]:
                previewElement = <textarea className="form-control" rows="5" placeholder="输入提示"/>;
                break;

            case this.props.list[2]:
                previewElement = <input className="form-control" type="text" placeholder="输入问题" />;
                break;
            case this.props.list[3]:
                var Button = ReactBootstrap.Button;
                previewElement = <Button bsStyle="primary" bsSize="medium" disabled={true}>上传照片</Button>;
                break;

        }

        return (
            <div className="form-group">
                <label className="col-sm-2 control-label">&nbsp;</label>
                <div className="col-sm-8">
                    {previewElement}
                </div>
            </div>
        );
    }
});

var AddQuestionButton = React.createClass({
    render: function() {
        var Button = ReactBootstrap.Button;
        var Glyphicon  = ReactBootstrap.Glyphicon;
        return (
            <Button className="st-add-button" bsStyle={'primary'} bsSize={'large'} block={true} onClick={this.props.onClick}><Glyphicon className="st-top-align" glyph={'plus-sign'}/> 添加新问题 </Button>
        );
    },
});

var QuestionList = React.createClass({
    getInitialState: function () {
        return {
            numQuestions: 0
        };
    },
    handleAddNewQuestion: function () {
        this.setState({numQuestions: this.state.numQuestions + 1});
    },
    handleDelete: function (index) {
        console.log('delete ' + index);
        {/* this.setState({numQuestions: this.state.numQuestions + 1}); */}
    },
    render: function() {
        var questions = [];
        for (var i=0;i < this.state.numQuestions; i++){
            var boundClick = this.handleDelete.bind(this, i);
            questions.push(<QuestionEditor key={i} onClick={boundClick} />);
        }

        return (
          <div>
              {questions}
              <AddQuestionButton onClick={this.handleAddNewQuestion} />
          </div>
        );
    },
});



var EditorForm = React.createClass({
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

React.render(
    <EditorForm />,
    $("#content")[0]
);
