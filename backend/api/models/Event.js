/**
 * Event.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {type: 'string', required: true},
    location: {type: 'string', required: true},
    startsAt: {
      type: 'ref',
      columnType: 'datetime',
      required: true
    },
    endsAt: {
      type: 'ref',
      columnType: 'datetime',
      required: true
    }
  }

};

