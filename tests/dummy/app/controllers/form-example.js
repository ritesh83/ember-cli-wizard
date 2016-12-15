import Ember from 'ember';

export default Ember.Controller.extend({

    wizardData: [
        {'step_id': '1', 'header_label': '1. Account'},
        {'step_id': '2', 'header_label': '2. Profile'}
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
