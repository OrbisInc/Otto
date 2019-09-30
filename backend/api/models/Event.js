/**
 * Event.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const EventType = {
  Birthday: 'Birthday',
  Social: 'Social',
  Deployment: 'Deployment'
};

module.exports = {

  attributes: {
    title: {type: 'string', required: true},
    type: {type: 'string', required: true},
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

