/**
 * Announcement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var moment = require("moment");

module.exports = {

  attributes: {

    message: {type: 'string', required: true},
    expiresAt: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: moment().add(3, 'days').unix()
    }

  },

};

