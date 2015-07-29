var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EventType = require('../constants/EventType');
var QuestionType = require('../constants/QuestionType');
var assign = require('object-assign');

var _questions = {};
var LIST_CHANGE_EVENT = 'change';

/**
 * Create a new queston object
 * @param  {string} question_text text content of a question
 * @param  {string} help_text text content of the help text
 * @param  {QuestionType} question_type type of a question
 */
function create(question_text, placeholder_text, question_type, order){
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _questions[id] = {
        id: id,
        question_text: question_text,
        placeholder_text: placeholder_text,
        question_type: question_type,
        order: order
    };
}

function destroy(id){
    /* console.log('Store destory called id:' + id); */
    delete _questions[id];
}

var QuestionStore = assign({}, EventEmitter.prototype, {
    getAll: function () {
        return _questions;
    },

    emitChange: function () {
        this.emit(LIST_CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(LIST_CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback){
        this.removeListener(LIST_CHANGE_EVENT, callback);
    },
});

AppDispatcher.register(function (action) {
    /* console.log('Dispatcher received action: ' + action.actionType); */
    switch(action.actionType){
        case EventType.QUESTION_CREATE:
            create(action.question_text, action.placeholder_text, action.question_type);
            QuestionStore.emitChange();
            break;
        case EventType.QUESTION_DESTROY:
            destroy(action.id);
            QuestionStore.emitChange();
            break;
    }
});

module.exports = QuestionStore;
