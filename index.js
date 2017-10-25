/* jshint node: true */
/* eslint-env node */

'use strict';

module.exports = {
  name: 'ember-cli-wizard',
 
  included: function(app) {
    this.addons.forEach(function(addon) {
      if (addon.name === "ember-version-is") {
        addon.included.apply(addon, [app]);
      }
    });
  }
};
