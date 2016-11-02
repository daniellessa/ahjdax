/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'users',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    deviceToken: { type: 'string' },

    name: { type: 'string' },

    phone: { type: 'string' },

    sex: { 
      type: 'string',
      enum: ['M','F'],
      required: true
    },

    bucketName: { type: 'string' },

    photoPath: { type: 'string' },

    //Relations

    // professional: {
    //   model: 'professional',
    //   via: 'user'
    // },

    waitingList: { 
      collection: 'waitinglist',
      via: 'user'
    },

    events: {
      collection: 'event',
      via: 'user'
    },

    roles: {
      collection: 'role',
      through: 'userhasrole',
      via: 'role'
    },

  }
};

