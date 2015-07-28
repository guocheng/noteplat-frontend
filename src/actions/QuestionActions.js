var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventType = require('../constants/EventType');

var QuestionActions = {
    create: function (question_text, placeholder_text, question_type, order) {
        AppDispatcher.dispatch({
            actionType: EventType.QUESTION_CREATE,
            question_text: question_text,
            placeholder_text: placeholder_text,
            question_type: question_type,
            order: order
        });
    },

    destroy: function (id) {
        AppDispatcher.dispatch({
            actionType: EventType.QUESTION_DESTROY,
            id: id
        });
    }
};

module.exports = QuestionActions;
