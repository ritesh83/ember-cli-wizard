# ember-cli-wizard

Ember wizard component inspired by [jquery-steps](http://www.jquery-steps.com/examples).

Demo: https://ritesh83.github.io/ember-cli-wizard/#/basic-example

## Installation

    ember install ember-cli-wizard

## Usage

Out of the box, the bare minimum you need on the template is `wizardData`.

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
</div>
````

## Demo

http://ritesh83.github.io/ember-cli-wizard/#/basic-example

All examples are in the dummy app.

* Clone this repo: `git clone`
* Install packages: `npm install` && `bower install`
* Run `ember s`
* Visit the sample app at http://localhost:4200.
