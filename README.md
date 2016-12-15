# ember-cli-wizard

Ember wizard component inspired by [jquery-steps](http://www.jquery-steps.com/examples).

Demo: https://ritesh83.github.io/ember-cli-wizard/#/basic-example

## Installation

    ember install ember-cli-wizard

## Usage

````Handlebars
{{#ember-cli-wizard
    wizardData=wizardData        
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
### Options

| Name              | Default           | Description                        |
|-------------------|-------------------|------------------------------------|
| animate           | true              | Adds animation between wizard steps|
| animationDuration | 300ms             | The animation duration between steps. Also requires a css style override. Refer to CSS section|
| showHeader        | true              | Shows one header button for each step with active state style for the current step|
| showDelete        | false             | Adds a delete button and sends the 'deleteAction' on click|
| submitAction      | 'submitAction'    | The action that is sent when last next button (Finish) is clicked|
| cancelAction      | 'cancelAction'    | The action that is sent when the first previous button (Cancel) is clicked|

## Demo

http://ritesh83.github.io/ember-cli-wizard/#/basic-example

All examples are in the dummy app.

* Clone this repo: `git clone`
* Install packages: `npm install` && `bower install`
* Run `ember s`
* Visit the sample app at http://localhost:4200.
