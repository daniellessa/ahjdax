/**
 * PropertyHasUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'propertiesHasUsers',
  autoCreatedAt: true, //current (timezone-agnostic) timestamp
  autoUpdatedAt: true, //current (timezone-agnostic) timestamp

  attributes: {

    relationship: {
      type: 'string',
      enum: ['Admin','professional','client','secretary']
    },

    //Relations

    property: {
      model: 'property',
      via: 'id',
      columnName: 'properties_id'
    },

    user: {
      model: 'user',
      via: 'id',
      columnName: 'users_id'
    },

  }
};

