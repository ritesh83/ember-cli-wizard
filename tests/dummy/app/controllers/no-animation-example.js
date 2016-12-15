import Ember from 'ember';

export default Ember.Controller.extend({

    wizardData: [
        {'step_id': '1', 'header_label': '1. First Step'},
        {'step_id': '2', 'header_label': '2. Second Step'},
        {'step_id': '3', 'header_label': '3. Third Step'}
    ],

    actions: {

        cancelAction() {
            //window.history.back();
        },

        submitAction() {
            console.log('submitAction');
        }

    }
});
