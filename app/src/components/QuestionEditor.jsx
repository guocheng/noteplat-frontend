var React = require('react/addons'),
    Button = require('react-bootstrap/lib/Button'),
    Glyphicon = require('react-bootstrap/lib/Glyphicon'),
    QuestionTypeSelector = require('./QuestionTypeSelector'),
    QuestionActions = require('../actions/QuestionActions'),
    QuestionType = require('../constants/QuestionType'),
    DndTypes = require('../constants/DndTypes'),
    ReactDnD = require('react-dnd');

var QuestionEditor = React.createClass({
    propTypes: {
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        question: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            value: ''
        };
    },
    render: function () {
        var displayName = [];
        for (var key in QuestionType){
            displayName.push(QuestionType[key]);
        }

        var style = {
            backgroundImage: 'url(' + require('../../img/draghandle.png') + ')'
        };

        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

        return this.props.connectDragPreview(this.props.connectDropTarget(
            <ReactCSSTransitionGroup transitionName='test' transitionAppear={true}>
                <div className='container-editor' style={{opacity:this.props.isDragging ? 0.4 : 1}}>
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
                                value={this.state.value}/>
                        </div>
                        <div className="col-sm-1 col-sm-offset-1">
                             <Button onClick={this._onDestoryClick}><Glyphicon className="st-top-align" glyph={'trash'}/></Button>
                        </div>
                    </div>

                    <QuestionTypeSelector list={displayName} onSave={this._onSave} qid={this.props.question.id} />
                </div>
            </ReactCSSTransitionGroup>
        ));
    },

    _onTextSave: function () {
        QuestionActions.update(this.props.question.id, {questionText: this.state.value});
    },

    _onSave: function(id, updateKV) {
        QuestionActions.update(id, updateKV);
    },

    _onChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },

    _onDestoryClick: function () {
        QuestionActions.destroy(this.props.question.id);
    }
});

var questionSource = {
    beginDrag: function (props) {
        return { id: props.question.id };
    }
};

var questionTarget = {
    hover: function(props, monitor) {
        var draggedId = monitor.getItem().id;

        if (draggedId !== props.question.id) {
            QuestionActions.swap(draggedId, props.question.id);
        }
    }
};

var DragSourceDecorator = ReactDnD.DragSource(DndTypes.QUESTION, questionSource,
    function(connect, monitor){
        return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging()
        };
});

var DropTargetDecorator = ReactDnD.DropTarget(DndTypes.QUESTION, questionTarget,
    function (connect) {
        return {
            connectDropTarget: connect.dropTarget()
        };
});

module.exports = DropTargetDecorator(DragSourceDecorator(QuestionEditor));
