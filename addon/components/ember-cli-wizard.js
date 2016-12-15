import Ember from 'ember';

export default Ember.Component.extend({
    currentStep: '1',

    classNames: 'container-fluid well',

    showHeader: true,

    animate: true,

    animationDuration: 300,

    isAnimating: false,

    direction: null,

    didUpdateAttrs() {
        this._super(...arguments);

        if (this.get('wizardShowNextStep') === true) {
            this.changeWizardStep('next');
        }
    },

    isLastStep: Ember.computed('currentStep', function() {
        if (Number(this.get('currentStep')) === this.get('wizardData.length')) {
            return true;
        }

        return false;
    }),

    isFirstStep: Ember.computed('currentStep', function() {
        if (Number(this.get('currentStep')) === 1) {
            return true;
        }

        return false;
    }),

    changeWizardStep(direction) {
        if (this.get('animate')) {
            if (this.get('isAnimating')) {
                return false;
            }
            this.set('isAnimating', true);
        }

        this.set('direction', direction);

        // Stop the animation after a while
        Ember.run.later(this, function() {
            let currentStep;
            if (direction === 'next') {
                currentStep = Number(this.get('currentStep')) + 1 + '';
            } else {
                currentStep = Number(this.get('currentStep')) - 1 + '';
            }
            this.set('currentStep', currentStep);

            if (this.get('animate')) {
                this.set('isAnimating', false);
            }
        }, this.get('animationDuration'));
    },

    actions: {
        incrementStep() {
            if (this.get('isLastStep')) {
                // perform submit action
                this.sendAction('submitAction');
            } else {
                let currentStepObj = this.get('wizardData').find((item) => {
                    if (item['step_id'] === this.get('currentStep')) {
                        return true;
                    }
                });

                if (Ember.isPresent(currentStepObj['hasAction']) && currentStepObj['hasAction'] === true) {
                    this.set('wizardShowNextStep', false);
                    this.sendAction('wizardStepChangeAction', currentStepObj);
                } else {
                    this.changeWizardStep('next');
                }
            }
        },

        decrementStep() {
            if (this.get('isFirstStep')) {
                this.sendAction('cancelAction');
            } else {
                this.changeWizardStep('prev');
            }
        },

        handleNavClick() {
            //
        },

        deleteAction() {
            this.sendAction('deleteAction');
        }
    }
});
