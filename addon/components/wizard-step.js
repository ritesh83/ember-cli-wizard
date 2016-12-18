import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',

    isCurrent: Ember.computed('wizardCurrentState.currentStep', function() {
        if (Ember.isPresent(this.get('wizardCurrentState'))) {
            if (this.get('stepId') === this.get('wizardCurrentState.currentStep')) {
                return true;
            }
        }

        return false;
    }),

    slidingOut: Ember.computed('wizardCurrentState.animating', function() {
        if (Ember.isPresent(this.get('wizardCurrentState'))) {
            if (this.get('isCurrent') && this.get('wizardCurrentState.animating')) {
                if (this.get('wizardCurrentState.direction') === 'next') {
                    this.set('slidingInClasses', 'exit slide-left');
                } else {
                    this.set('slidingInClasses', 'exit slide-right');
                }

                return true;
            }
        }

        return false;
    }),

    slidingIn: Ember.computed('wizardCurrentState.animating', function() {
        let wizardCurrentState = this.get('wizardCurrentState');
        if (Ember.isPresent(wizardCurrentState)) {
            if (wizardCurrentState.direction === 'next') {
                let nextStepId = Number(wizardCurrentState.currentStep) + 1;
                if (Number(this.get('stepId')) === nextStepId) {
                    this.set('slidingInClasses', 'enter slide-left');
                    return true;
                }
            } else {
                let prevStepId = Number(wizardCurrentState.currentStep) - 1;
                if (Number(this.get('stepId')) === prevStepId) {
                    this.set('slidingInClasses', 'enter slide-right');
                    return true;
                }
            }
        }

        return false;
    })
});
