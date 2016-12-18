# ember-cli-wizard

Ember wizard component inspired by [jquery-steps](http://www.jquery-steps.com/examples).

Demo: https://ritesh83.github.io/ember-cli-wizard/#/basic-example

## Installation

    ember install ember-cli-wizard

This addon uses the 'hash' helper and hence requires ember 2.3 or above. If you would like to use it with older versions of ember, install the [hash helper polyfill](https://github.com/cibernox/ember-hash-helper-polyfill).

## Usage

````Handlebars
{{#ember-cli-wizard
    wizardData=wizardData
    submitAction='submitAction'
    cancelAction='cancelAction'
    as |currentState|
}}
    {{#currentState.step stepId="1" wizardCurrentState=currentState}}
        <p>Step 1</p>
    {{/currentState.step}}

    {{#currentState.step stepId="2" wizardCurrentState=currentState}}
        <p>Step 2</p>
    {{/currentState.step}}

    {{#currentState.step stepId="3" wizardCurrentState=currentState}}
        <p>Step 3</p>
    {{/currentState.step}}
{{/ember-cli-wizard}}
````

```javascript
wizardData: [
    {'step_id': '1', 'header_label': '1. First Step'},
    {'step_id': '2', 'header_label': '2. Second Step'},
    {'step_id': '3', 'header_label': '3. Third Step'}
]
```

Import the wizard.css file in your app.

    @import "ember-cli-wizard/wizard";

The 'step_id' is the unique identifier of each wizard step.
The 'stepId' attribute value of each step needs to match the 'step_id' value in the 'wizardData'.

### Bootstrap

This addon has a dependency on ember-bootstrap.
Follow the instructions here in order to include or exclude fonts and styles in your app:
http://kaliber5.github.io/ember-bootstrap/getting-started/

### Options

| Name                   | Default | Description                        |
|------------------------|---------|------------------------------------|
| animate                | true    | Adds animation between wizard steps|
| animationDuration      | 300ms   | The animation duration between steps. Also requires a css style override. Refer to CSS section|
| showHeader             | true    | Shows one header button for each step with active state style for the current step|
| showDelete             | false   | Adds a delete button and sends the 'deleteAction' on click|
| submitAction           |         | The action that is sent when last next button (Finish) is clicked|
| cancelAction           |         | The action that is sent when the first previous button (Cancel) is clicked|
| deleteAction           |         | The action that is sent when the delete button is clicked|
| wizardShowNextStep     | true    | Flag to switch to the next step after performing async operation|
| wizardStepChangeAction |         | The action that is sent if a step has an async action|
| showWell               | true   | Adds the bootstrap 'well' class to the component|
| buttonLabels           | {'nextLabel':'Next', 'finishLabel':'Finish', 'cancelLabel':'Cancel', 'prevLabel':'Previous'} | The labels for the 4 button states|

## CSS

Use the following classes to override animation styles:

```css
.panel-wrapper {
    &.animating {
        .exit, .enter {
            -webkit-transition: all .7s ease-in-out;
            -ms-transition: all .7s ease-in-out;
            transition: all .7s ease-in-out;
        }
    }
}
```

By default the addon adds the bootstrap 'well' class to the main component. To remove the class set 'showWell' to false.

```Handlebars
{{#ember-cli-wizard
    showWell=false
}}
```

To override the default styles of the wizard steps, use the following classes:

```css
.panel-wrapper {
    height: 450px;
    background-color: #ececec;
}
```

## Async

To perform an async operation after an individual step, use the 'hasAction' property in the wizardData config and pass in the 'wizardShowNextStep' and 'wizardStepChangeAction' values.

```javascript
//js

wizardData: [
    {'step_id': '1', 'header_label': '1. First Step', 'hasAction': true},
    {'step_id': '2', 'header_label': '2. Second Step'},
    {'step_id': '3', 'header_label': '3. Third Step'}
]

wizardShowNextStep: true,

actions: {

    wizardStepChanged(wizardStep) {
        if (wizardStep['step_id'] === '1') {
            Ember.run.later(() => {
                this.set('wizardShowNextStep', true);                    
            }, 2000);
        }
    }

}
```

```Handlebars
//hbs

{{#ember-cli-wizard
    wizardData=wizardData
    submitAction="submitAction"
    cancelAction="cancelAction"
    wizardShowNextStep=wizardShowNextStep
    wizardStepChangeAction="wizardStepChanged"
    animationDuration=700
    as |currentState|
}}
```

### Buttons

To customize the button labels, set the 'buttonLabels' hash

```Handlebars
{{#ember-cli-wizard
    buttonLabels=customButtonLabels
}}
```

```javascript
customButtonLabels: {
    'nextLabel': 'Next',
    'finishLabel': 'Finish',
    'cancelLabel': 'Cancel',
    'prevLabel': 'Previous'
},
```

## Demo

http://ritesh83.github.io/ember-cli-wizard/#/basic-example

All examples are in the dummy app.

* Clone this repo: `git clone`
* Install packages: `npm install` && `bower install`
* Run `ember s`
* Visit the sample app at http://localhost:4200.
