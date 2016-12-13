import Ember from 'ember';

export default Ember.Component.extend({
    currentStep: '1',

    classNames: 'container-fluid well',

    showHeading: true,

    animate: true,

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

    animationDuration: 300,

    isAnimating: false,

    direction: null,

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
                this.changeWizardStep('next');
            }
        },

        decrementStep() {
            if (this.get('isFirstStep')) {
                window.history.back();
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
