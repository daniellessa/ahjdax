/**
 * ProfessionalHasService.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'professionalsHasServices',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    duration: { type: 'time' },

    //Relations

    professional: {
      model: 'professional',
      via: 'id',
      columnName: 'professionals_id'
    },

    service: {
      model: 'service',
      via: 'id',
      columnName: 'services_id'
    },

    

  }
};

