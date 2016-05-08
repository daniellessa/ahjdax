/**
 * Userrole.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'roles_has_users',

  autoPk: false,

  attributes: {
    
    users: {
      model: 'users',
      via: 'id',
      columnName: 'user_id'
    },

    roles: {
      model: 'roles',
      via: 'id',
      columnName: 'role_id'
    },

    property: {
      model: 'properties',
      via: 'id',
      columnName: 'property_id'
    }
  }
};

