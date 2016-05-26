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

    compareAndUpdateDeviceToken: function(device_token, user) {

            async.waterfall([

                function findUser(step){

                    Users.findOne({id: user.id}).exec(function(err, findedUser){
                        if(err)
                        {
                            err.status = 401;
                            return step(err);
                        }

                        step(null, user);
                    });
                },

                function updateUser(user, step){

                    if(user.registration_id !== device_token)
                    {
                        Users.update({id: user.id},{registration_id: device_token, photo_path: user.photo_path})
                            .exec(function(err, result){

                                if(err)
                                {
                                    err.status = 401;
                                    return step(err);
                                }

                            });
                    }

                    step(null, user)
                }


            ], function result(err,token) {
            if (err)
                return res.negotiate(err);

            console.log("Passou aqui #U001");
        });

    },

    checkIfAdmin: function(user_id, cb) {
        Userrole.find({user_id: user_id}).populate('roles').exec(function(err, found) {

        });
    },

    checkRoles: function(user_id, cb) {
        Userrole.find({user_id: user_id}).exec(function(err, found) {

            var response = {
                admin_master: false,
                admin: false,
                professional: false,
                user: false
            };

            _(found).forEach(function(role) {
                console.log(role);
                switch (role.role)
                {
                    case Roles.constants.ADMIN_MASTER:
                        response.admin_master = true;
                        break;

                    case Roles.constants.ADMIN:
                        response.admin = true;
                        break;

                    case Roles.constants.PROFESSIONAL:
                        response.professional = true;
                        break;

                    case Roles.constants.USER:
                        response.user = true;
                        break;
                }
            }).value();

            cb(err, response);

        });
    },


};

