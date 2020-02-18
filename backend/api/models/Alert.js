/**
 * Alert.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const AlertSeverity = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Critical: 'Critical'
};

module.exports = {

  attributes: {
    message: {type: 'string', required: true},
    severity: {type: 'string', defaultsTo: AlertSeverity.Low},
    active: {type: 'boolean', defaultsTo: true},
    highAlertDate: {type: 'string'}
  },

};

