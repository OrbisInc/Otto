/**
 * Birthday.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let moment = require("moment");

module.exports = {

  attributes: {
    name: {type: 'string', required: true},
    date: {
      type: 'ref',
      columnType: 'string',
      required: true
    },
  },

};

