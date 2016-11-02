/**
 * Property.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'properties',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    name: { type: 'string' },

    firstPhone: { type: 'string' },

    secondPhone: { type: 'string' },

    bucketName: { type: 'string' },

    photoPath: { type: 'string' },

    //Relations

    images: {
      collection: 'image',
      via: 'property'
    },

    // rating: {
    //   model: 'ratingproperty',
    //   via: 'property'
    // },

    workdays: {
      collection: 'workday',
      via: 'property'
    },

    services: {
      collection: 'propertyhasservice',
      via: 'service'
    },

    

  }
};

