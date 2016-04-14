/**
 * UsersHasServices.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'users_has_services',

  attributes: {

  	users: {
  		model: 'users',
  		via: 'id',
  		columnName: 'user_id',
  		on: 'id'
  	},

  	services: {
  		model: 'services',
  		via: 'id',
  		columnName: 'service_id',
  		on: 'id'
  	}

  }
};

