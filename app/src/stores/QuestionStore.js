var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EventType = require('../constants/EventType');
var assign = require('object-assign');

var _questions = {};
var LIST_CHANGE_EVENT = 'change';

/**
 * Create a new queston object
 * @param  {string} questionText text content of a question
 * @param  {string} help_text text content of the help text
 * @param  {QuestionType} questionType type of a question
 */
function create(questionText, placeholderText, questionType, order) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _questions[id] = {
        id: id,
        questionText: questionText,
        placeholderText: placeholderText,
        questionType: questionType,
        order: order
    };
}

function destroy(id) {
    /* console.log('Store destory called id:' + id); */
    delete _questions[id];
}

function update(id, updateKV) {
    console.log(updateKV);
    _questions[id] = assign({}, _questions[id], updateKV);
}

var QuestionStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _questions;
    },

    emitChange: function() {
        this.emit(LIST_CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(LIST_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(LIST_CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case EventType.QUESTION_CREATE:
            create(action.questionText, action.placeholderText, action.questionType);
            QuestionStore.emitChange();
            break;
        case EventType.QUESTION_DESTROY:
            destroy(action.id);
            QuestionStore.emitChange();
            break;
        case EventType.QUESTION_UPDATE:
            update(action.id, action.updateKV);
            QuestionStore.emitChange();
            break;
    }
});

module.exports = QuestionStore;
