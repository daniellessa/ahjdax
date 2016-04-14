/**
 * Roles.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 

module.exports = {

	constants: {
		ADMIN_MASTER: 1,
		ADMIN: 2,
		PROFESSIONAL: 3,
		USER: 4
	},	

  attributes: {

  	role: { type: 'string' },


  }
  
};

