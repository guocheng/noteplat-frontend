import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import QuestionTypeSelector from './QuestionTypeSelector';
import QuestionActions from '../actions/QuestionActions';
import { QuestionType } from '../constants/QuestionType';
import { DndTypes } from '../constants/DndTypes';
import { DragSource, DropTarget } from 'react-dnd';

const questionSource = {
    beginDrag: function (props) {
        return { id: props.question.id };
    }
};

const questionTarget = {
    hover: function(props, monitor) {
        let draggedId = monitor.getItem().id;

        if (draggedId !== props.question.id) {
            QuestionActions.swap(draggedId, props.question.id);
        }
    }
};

@DragSource(DndTypes.QUESTION, questionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))

@DropTarget(DndTypes.QUESTION, questionTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))

export default class QuestionEditor extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        question: PropTypes.object.isRequired
    }

    state = {value: ''};

    _onTextSave = () => {
        console.log('Eidtor: ' + this.props.question.id);
        QuestionActions.update(this.props.question.id, {questionText: this.state.value});
    }

    onSave = (id, updateKV) => {
        QuestionActions.update(id, updateKV);
    }

    _onChange =  (event) => {
        this.setState({
            value: event.target.value
        });
    }

    _onDestoryClick = () => {
        QuestionActions.destroy(this.props.question.id);
    }

    render() {
        let displayName = [];
        for (let key in QuestionType){
            displayName.push(QuestionType[key]);
        }

        let style = {
            backgroundImage: 'url(' + require('../../img/draghandle.png') + ')'
        };

        return this.props.connectDragPreview(this.props.connectDropTarget(
            <div className='container-editor' /* style={{opacity:this.props.isDragging ? 0.4 : 1}} */>
                {this.props.connectDragSource(<div className='st-drag-handle' style={style}></div>)}
                <div className="form-group">
                    <label className="control-label col-sm-2">问题</label>
                    <div className="col-sm-8">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="输入问题"
                            onBlur={this._onTextSave}
                            onChange={this._onChange}
                            value={this.state.value}
                        />
                    </div>
                    <div className="col-sm-1 col-sm-offset-1">
                         <Button onClick={this._onDestoryClick}><Glyphicon className="st-top-align" glyph={'trash'}/></Button>
                    </div>
                </div>

                <QuestionTypeSelector typeList={displayName} onSave={this.onSave} qid={this.props.question.id} />
            </div>
        ));
    }
}
