import React from 'react';
import QuestionEditor from './QuestionEditor';
import AddButton from './AddButton';
import QuestionStore from '../stores/QuestionStore';
import QuestionType from '../constants/QuestionType';
import QuestionActions from '../actions/QuestionActions';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';

let {Component, PropTypes} = React;

function getQuestionState(){
    return {
        allQuestions: QuestionStore.getAll()
    };
}

class QuestionList extends Component{

    static propTypes = {
        allQuestions: PropTypes.arrayOf(PropTypes.object)
    }

    constructor() {
        super();
        this.state = getQuestionState();
    }

    componentDidMount() {
        QuestionStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        QuestionStore.removeChangeListener(this._onChange);
    }

    _onChange = () => {
        this.setState(getQuestionState());
    }

    _onCreateClick = () => {
        QuestionActions.create('','', Object.keys(QuestionType)[0]);
    }

    render() {
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
    }
}

export default DragDropContext(HTML5Backend)(QuestionList);
