/**
 * Professionals.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	autoCreatedAt: true,
    autoUpdatedAt: true,

  attributes: {

  	startAt: { type: 'date'},

  	endsAt: { type: 'date'},

  	split: { type: 'date'},

  	interval: { type: 'date'},

  	startLunchAt: { type: 'date'},

  	endsLunchAt: { type: 'date'},

  	workSunday: { type: 'boolean'},

  	workMonday: { type: 'boolean'},

  	workTuesday: { type: 'boolean'},

  	workWednesday: { type: 'boolean'},

  	workThursday: { type: 'boolean'},

  	workFriday: { type: 'boolean'},

  	workSaturday: { type: 'boolean'},

    users: {
          model: 'users',
          via: 'id',
          columnName: 'user_id'
        },

    professions: {
          model: 'professions',
          via: 'id',
          columnName: 'professions_id'
        },

    properties: {
          model: 'properties',
          via: 'id',
          columnName: 'property_id'
        },

  }
};

