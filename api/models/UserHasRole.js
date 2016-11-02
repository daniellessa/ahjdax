/**
 * UserHasRole.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'usersHasRoles',
  autoPK: false, // no primary key (id)
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    //Relations

    user: {
      model: 'user'
    },

    role: {
      model: 'role'
    },

  }
};