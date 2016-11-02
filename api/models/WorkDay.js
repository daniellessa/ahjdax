/**
 * WorkDays.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'workDays',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    startAt: { type: 'time' },

    endsAt: { type: 'time' },

    startLunch: { type: 'time' },

    endsLunch: { type: 'time' },

    visible: { type: 'boolean' },

    //Relations

    property: {
      model: 'property',
      via: 'id',
      columnName: 'properties_id'
    },

    professional: {
      model: 'professional',
      via: 'id',
      columnName: 'professionals_id'
    },

    weekday: {
      model: 'weekday',
      via: 'id',
      columnName: 'weekDays_id'
    },

    

  }
};

