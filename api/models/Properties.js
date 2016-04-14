/**
 * Properties.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	autoCreatedAt: true,
    autoUpdatedAt: true,

  attributes: {

  	pin: {type: 'string' },
  	
  	name: { type: 'string' },

  	photo_path: { type: 'string' },

  	bucket_name: { type: 'string' },

  	info: { type: 'string'},

  	open_day: { type: 'string'},

  	open_hour: { type: 'string'},

  	phone: { type: 'string'},

  	street: { type: 'string'},

  	number: { type: 'string'},

  	city: { type: 'string'},

  	lat: { type: 'float'},

  	lng: { type: 'float'}

  },




};

