import Ember from 'ember';

export default Ember.Controller.extend({

    wizardData: [
        {'step_id': '1', 'header_label': 'First'},
        {'step_id': '2', 'header_label': 'Second'},
        {'step_id': '3', 'header_label': 'Third'}
    ],

    actions: {

        cancelAction() {
            //window.history.back();
        },

        submitAction() {
            //console.log('submitAction');
        }

    }
});
