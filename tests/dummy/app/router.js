import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('basic-example');
    this.route('async-example');
    this.route('form-example');
    this.route('delete-example');
    this.route('no-animation-example');
});

export default Router;
