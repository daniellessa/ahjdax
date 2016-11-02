/**
 * PropertyHasService.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'propertiesHasServices',
  autoPK: true, // no primary key (id)
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    price: { type: 'float' },

    oldPrice: { type: 'float' },

    description: { type: 'string' },

    //Relations

    property: {
      model: 'property',
      via: 'id',
      columnName: 'properties_id'
    },

    service: {
      model: 'service',
      via: 'id',
      columnName: 'services_id'
    },

  }

};

