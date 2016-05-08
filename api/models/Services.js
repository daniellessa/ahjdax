/**
 * Services.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	property: {
  		model: 'properties',
  		via: 'id',
  		columnName: 'property_id'
  	},

  	name: { type: 'string'},

  	hours: { type: 'int'},

  	minutes: { type: 'int'},

    old_price: { type: 'float'},

  	price: { type: 'float'},

  	info: { type: 'string'},

    users: {
          collection: 'users',
          via: 'user_id',
          through: 'usershasservices'
        },

  }
};

