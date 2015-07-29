var React = require('react');
var QuestionEditor = require('./QuestionEditor');
var AddButton = require('./AddButton');
var QuestionStore = require('../stores/QuestionStore');
var QuestionType = require('../constants/QuestionType');
var QuestionActions = require('../actions/QuestionActions');

function getQuestionState(){
    return {
        allQuestions: QuestionStore.getAll()
    };
}

var QuestionList = React.createClass({
    getInitialState: function () {
        return getQuestionState();
    },

    componentDidMount: function(){
        QuestionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        QuestionStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var questions = null;
        var allQuestions = this.state.allQuestions;
        if(Object.keys(allQuestions).length > 0){
            questions = [];
            for (var key in allQuestions){
                questions.push(<QuestionEditor key={key} question={allQuestions[key]} />);
            }
        }

        return (
          <div>
              {questions}
              <AddButton onClick={this._onCreateClick} />
          </div>
        );
    },

    _onChange: function () {
        this.setState(getQuestionState());
    },

    _onCreateClick: function () {
        QuestionActions.create('','', Object.keys(QuestionType)[0]);
    },
});

module.exports = QuestionList;
