/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var nodemailer = require('nodemailer'); //importing nodemailer
var sesTransport = require('nodemailer-ses-transport');
var bcrypt = require('bcryptjs');
var async = require('async');
var _ = require('lodash');

module.exports = {

    autoCreatedAt: true,
    autoUpdatedAt: true,

    temp_password: null,

  attributes: {

    registration_id : { type: 'string'},

  	email : { type: 'string', required: true, unique: true },

    password: { type: 'string' },

    name : { type: 'string' },

    sex : { type: 'string' },

    photo_path : { type: 'string' },

    bucket_name : { type: 'string' },

    professional : {
        collection: 'professionals',
        via: 'users'
    },

    roles: {
        	collection: 'userrole',
        	via: 'users'
        },

    services: {
          collection: 'services',
          via: 'serves',
          through: 'usershasservices'
        },

    


    toJSON: function() {
        	var obj = this.toObject();
        	delete obj.password;
        	return obj;
        }

  },


  beforeCreate: function(values, next) {
        var that = this;
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(values.password, salt, function(err, hash) {
                if(err) return next(err);
                console.log("Pass: ", hash)
                values.password = hash;
                next();
            });
        });
    },

    comparePassword: function(password, user, cb) {
        bcrypt.compare(password, user.password, function(err, match) {

            if(err) cb(err);

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

    checkIfAdmin: function(user_id, cb) {
        Userrole.find({user_id: user_id}).populate('roles').exec(function(err, found) {

        });
    },

    checkRoles: function(user_id, cb) {
        Userrole.find({user_id: user_id}).exec(function(err, found) {

            var response = {
                nurse: false,
                physician: false,
                admin: false,
                teamAdmin: false
            };

            _(found).forEach(function(role) {
                console.log(role);
                switch (role.role)
                {
                    case Roles.constants.ADMIN:
                        response.admin = true;
                        break;

                    case Roles.constants.PHYSICIAN:
                        response.physician = true;
                        break;

                    case Roles.constants.NURSE:
                        response.nurse = true;
                        break;

                    case Roles.constants.TEAM_ADMIN:
                        response.teamAdmin = true;
                        break;
                }
            }).value();

            cb(err, response);

        });
    },


};

