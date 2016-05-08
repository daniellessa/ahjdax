/**
 * Events.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {

    professionals_id: { type: 'int'},

    users_id: { type: 'int'},

    services_id: { type: 'int'},

    day: { type: 'string'},

  	startAt: { type: 'string' },

  	endsAt: { type: 'string' },

  	status: { 
  		type: 'string',
  		enum: ['pending','serving','finished', 'canceled', 'missed'] 
  	},

  	finalized: { type: 'boolean' },

  	finalizedAt: { type: 'string' },

    professionals: {
      model: 'professionals',
      via: 'id',
      columnName: 'professionals_id'
    },

    users: {
      model: 'users',
      via: 'id',
      columnName: 'users_id'
    },

    services: {
      model: 'services',
      via: 'id',
      columnName: 'services_id'
    }

  }
};

