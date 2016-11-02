/**
 * Professional.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var bcrypt = require('bcryptjs');

module.exports = {

  tableName: 'professionals',
  autoCreatedAt: true, //current (timezone-agnostic) timestamp
  autoUpdatedAt: true, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    email: { 
      type: 'string',
      required: true
    },

    password: { 
      type: 'string',
      required: true 
    },

    split: { type: 'time' },

    interval: { type: 'time' },

    //Relations

    user: { 
      model: 'user',
      via: 'id',
      columnName: 'users_id'
    },

    profession: {
      model: 'profession',
      via: 'id',
      columnName: 'professions_id'
    },

    properties: {
      collection: 'workday',
      via: 'professional'
    },

    services: {
      collection: 'professionalhasservice',
      via: 'service'
    },

  },


  beforeCreate: function(values, next) {
    var that = this;

    console.log('entrou');

    if ( values.password === null || typeof values.password === 'undefined' )
    {
      var generatePassword = require('password-generator');

      values.password = generatePassword(6, false);
      that.temp_password = values.password;

      console.log('Generating Pass: ', values.password);

      var salt = bcrypt.genSaltSync(10);
      values.password = bcrypt.hashSync(values.password, salt);

      console.log('Hash Pass: ', values.password);
      next();
    }
    else
    {
      var salt = bcrypt.genSaltSync(10);
      values.password = bcrypt.hashSync(values.password, salt);

      console.log('Just Hashing Pass: ', values.password);

      next();
    }

  },

  comparePassword: function(passwordTyped, professional, cb) {
    bcrypt.compare(passwordTyped, professional.password, function(err, match) {
      if(err)
          return cb(err);

      if(match)
      {
          cb(null, true);
      }
      else
      {
          cb(err);
      }
    });
  },

};

