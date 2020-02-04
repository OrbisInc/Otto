/**
 * Deployment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let moment = require("moment");

module.exports = {

  attributes: {
    message: {type: 'string', required: true},
    school: {type: 'string', required: true},
    deploymentDate: {type: 'string'},
    expiresAt: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: moment()
        .add(3, 'days')
        .unix()
    }
  },

};

