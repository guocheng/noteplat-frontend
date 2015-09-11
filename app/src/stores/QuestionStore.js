/* @flow */

import {AppDispatcher} from '../dispatcher/AppDispatcher';
import {EventType} from '../constants/EventType';
import assign from 'object-assign';
import {EventEmitter} from 'events';

let _questions = [];
const LIST_CHANGE_EVENT = 'change';

/**
 * Create a new queston object
 * @param  {string} questionText text content of a question
 * @param  {string} help_text text content of the help text
 * @param  {QuestionType} questionType type of a question
 */
function create(questionText, placeholderText, questionType, order) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _questions.push({
        id: id,
        questionText: questionText,
        placeholderText: placeholderText,
        questionType: questionType,
        order: order
    });
}

/**
 * Remove a question object from the list
 * @param  {String} id The id of a question object to be removed
 */
function destroy(id) {
    for (let i = 0; i < _questions.length; i++){
        if (_questions[i].id === id){
            _questions.splice(i, 1);
            break;
        }
    }

    //After an item is deleted, update the order property of all existing items
    for (let j = 0; j < _questions.length; j++){
        _questions[j].order = j;
    }
}

/**
 * Update the content of an question object
 * @param  {String} id       The id of a question object to be updated
 * @param  {Object} updateKV A key value pair object that contains the updated info
 */
function update(id, updateKV) {
    for (let i = 0; i < _questions.length; i++){
        if (_questions[i].id === id){
            _questions[i] = assign({}, _questions[i], updateKV);
            break;
        }
    }
}

/**
 * Compare the question order
 * @param  {Object} q1 A question object
 * @param  {Object} q2 A quesiton object
 * @return {int}
 */
function compareQuestions(q1, q2){
    return q1.order - q2.order;
}

/**
 * Swap the order of two question objects
 * @param  {String} id1 The id of a question object
 * @param  {String} id2 The id of a question object
 */
function swap(id1, id2) {
    let q1 = _questions.filter(q => q.id === id1)[0];
    let q2 = _questions.filter(q => q.id === id2)[0];

    let quest1Order = q1.order;
    q1.order = q2.order;
    q2.order = quest1Order;

    _questions.sort(compareQuestions);
}

let QuestionStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        console.log(_questions);
        return _questions;
    },

    getLength: function() {
        return _questions.length;
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

AppDispatcher.register(action => {
    console.log('Received: ' + action.actionType);
    switch (action.actionType) {
        case EventType.QUESTION_CREATE:
            create(action.questionText,
                   action.placeholderText,
                   action.questionType,
                   QuestionStore.getLength());
            break;
        case EventType.QUESTION_DESTROY:
            destroy(action.id);
            break;
        case EventType.QUESTION_UPDATE:
            update(action.id, action.updateKV);
            break;
        case EventType.QUESTION_SWAP:
            swap(action.id1, action.id2);
            break;
    }

    QuestionStore.emitChange();
});

export { QuestionStore };
