var React = require('react/addons'),
    QuestionEditor = require('./QuestionEditor'),
    AddButton = require('./AddButton'),
    QuestionStore = require('../stores/QuestionStore'),
    QuestionType = require('../constants/QuestionType'),
    QuestionActions = require('../actions/QuestionActions'),
    MountMixin = require('../mixins/MountMixin'),
    HTML5Backend = require('react-dnd/modules/backends/HTML5'),
    ReactDnD = require('react-dnd');

function getQuestionState(){
    return {
        allQuestions: QuestionStore.getAll()
    };
}

var QuestionList = React.createClass({
    getInitialState: function () {
        return getQuestionState();
    },

    mixins: [MountMixin],

    render: function() {
        var questions = null;
        var allQuestions = this.state.allQuestions;
        if (allQuestions.length > 0){
            questions = allQuestions.map(function (question){
                return (
                    <QuestionEditor
                        key={question.id}
                        question={question}
                    />);
            });
        }
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

        return (
            <div>
                <ReactCSSTransitionGroup transitionName='test'>
                    {questions}
                </ReactCSSTransitionGroup>
                <AddButton onClick={this._onCreateClick} />
            </div>
        );
    },

    _onChange: function () {
        this.setState(getQuestionState());
    },

    _onCreateClick: function () {
        QuestionActions.create('','', Object.keys(QuestionType)[0]);
    }
});

module.exports = ReactDnD.DragDropContext(HTML5Backend)(QuestionList);
