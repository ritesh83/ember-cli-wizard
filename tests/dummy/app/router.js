import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('basic-example');
    this.route('async-example');
    this.route('form-example');
});

export default Router;
