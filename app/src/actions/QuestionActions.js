var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventType = require('../constants/EventType');

var QuestionActions = {
    create: function (questionText, placeholderText, questionType, order) {
        AppDispatcher.dispatch({
            actionType: EventType.QUESTION_CREATE,
            questionText: questionText,
            placeholderText: placeholderText,
            questionType: questionType,
            order: order
        });
    },

    destroy: function (id) {
        AppDispatcher.dispatch({
            actionType: EventType.QUESTION_DESTROY,
            id: id
        });
    },

    update: function (id, updateKV) {
        AppDispatcher.dispatch({
            actionType: EventType.QUESTION_UPDATE,
            id: id,
            updateKV: updateKV
        });
    }
};

module.exports = QuestionActions;
