/**
 * WaitingList.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'waitingList',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    day: { type: 'string' },

    //Relations

    professional: { 
      model: 'professional',
      via: 'id',
      columnName: 'professionals_id'
    },

    user: { 
      model: 'user',
      via: 'id',
      columnName: 'users_id'
    },

    service: { 
      model: 'service',
      via: 'id',
      columnName: 'services_id'
    },





  }
};

