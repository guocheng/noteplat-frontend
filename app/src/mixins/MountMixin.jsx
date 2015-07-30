var QuestionStore = require('../stores/QuestionStore');

var MountMixin = {
    componentDidMount: function(){
        QuestionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        QuestionStore.removeChangeListener(this._onChange);
    }
};

module.exports = MountMixin;
