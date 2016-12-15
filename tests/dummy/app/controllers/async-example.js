import Ember from 'ember';

export default Ember.Controller.extend({

    wizardData: [
        {'step_id': '1', 'header_label': '1. First Step', 'hasAction': true},
        {'step_id': '2', 'header_label': '2. Second Step'},
        {'step_id': '3', 'header_label': '3. Third Step'}
    ],

    wizardShowNextStep: true,

    actions: {

        cancel() {
            //window.history.back();
        },

        submitAction() {
            console.log('submitAction');
        },

        wizardStepChanged(wizardStep) {
            if (wizardStep['step_id'] === '1') {
                Ember.run.later(() => {
                    this.set('wizardShowNextStep', true);
                }, 3000);
            }
        }

    }
});
