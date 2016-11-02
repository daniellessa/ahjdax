/**
 * Service.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'services',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    name: { type: 'string' },

    //Relations

    professionals: {
      collection: 'professionalhasservice',
      via: 'professional'
    },

    properties: {
      collection: 'propertyhasservice',
      via: 'property'
    },

  }
};

