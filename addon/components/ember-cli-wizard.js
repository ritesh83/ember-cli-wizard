import Ember from 'ember';
import emberVersionIs from 'ember-version-is';

export default Ember.Component.extend({
    currentStep: '1',

    classNameBindings: ['wellClass'],

    classNames: ['container-fluid'],

    showHeader: true,

    showWell: true,
    
    isValid: true,
    
    nextBtnDisabled: Ember.computed('isValid', function() {
        if (this.get('isValid') === true) {
            return '';
        } else {
            return 'disabled';
        }
    }),
    
    useContextualComponents: Ember.computed(function() {
        if (emberVersionIs('greaterThanOrEqualTo', "2.3.0")) {
            return true;
        }
        
        return false;
    }),

    previousBtnLabel: Ember.computed('buttonLabels', function() {
        if (Ember.isPresent(this.get('buttonLabels.prevLabel'))) {
            return this.get('buttonLabels.prevLabel');
        }

        return 'Previous';
    }),

    nextBtnLabel: Ember.computed('buttonLabels', function() {
        if (Ember.isPresent(this.get('buttonLabels.nextLabel'))) {
            return this.get('buttonLabels.nextLabel');
        }

        return 'Next';
    }),

    cancelBtnLabel: Ember.computed('buttonLabels', function() {
        if (Ember.isPresent(this.get('buttonLabels.cancelLabel'))) {
            return this.get('buttonLabels.cancelLabel');
        }

        return 'Cancel';
    }),

    finishBtnLabel: Ember.computed('buttonLabels', function() {
        if (Ember.isPresent(this.get('buttonLabels.finishLabel'))) {
            return this.get('buttonLabels.finishLabel');
        }

        return 'Finish';
    }),

    buttonLabels: {
        'prevLabel': 'Previous',
        'nextLabel': 'Next',
        'finishLabel': 'Finish',
        'cancelLabel': 'Cancel'
    },

    wellClass: Ember.computed('showWell', function() {
        if (this.get('showWell') === true) {
            return 'well';
        }

        return '';
    }),

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

        if (this.get('animate')) {
            // Stop the animation after a while
            Ember.run.later(this, function() {
                this._updateCurrentStep(direction);
                this.set('isAnimating', false);
            }, this.get('animationDuration'));
        } else {
            this._updateCurrentStep(direction);
        }
    },

    _updateCurrentStep(direction) {
        let currentStep;
        if (direction === 'next') {
            currentStep = Number(this.get('currentStep')) + 1 + '';
        } else {
            currentStep = Number(this.get('currentStep')) - 1 + '';
        }
        this.set('currentStep', currentStep);
    },
    
    showRoundedNav: Ember.computed('useRoundedNav', function() {
        if (this.get('useRoundedNav') === true) {
            return true;
        }

        return false;
    }),
    
    headerStepsSizeClass: 'col-xs-4',

    actions: {
        incrementStep() {
            if (this.get('isValid') === true) {
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
