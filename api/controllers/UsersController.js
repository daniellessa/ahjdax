/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');
var async = require('async');
var _ = require('lodash');
var generatePassword = require('password-generator');

module.exports = {

//Refatorar createUser...

	createUser: function(req, res) {

		console.log("Entrou Create User: ", req.body);

		var roles;

		if ( typeof req.body.roles !== 'undefined' )
		{
			roles = req.body.roles;
			delete req.body.roles;
		}

		Users.create(req.body).exec(function(err, user) {
			if(err)
			{

				return res.json(err.status, {err: err});
			}

			if(user)
			{
				console.log('NEW USER:', user);
				var entries = [];
				//workaround for inserting into users_has_roles table
				for (var r in roles)
				{
					var entry = {};
					entry.user_id = user.id;
					entry.role_id = roles[r];
					entries.push(entry);
				}

				console.log('entry',entry);

				Userrole.create(entries).exec(function(err, Userrole) {
					if (err)
					{
						console.log('err',err);
					}

					var jwt = jwToken.issue({id: Userrole.id});

					res.json(200, {
						user: user, 
						token: jwt
					});

				});

				
			}
		});

	},

	updateImage: function(req, res){

		Users.update({id: req.body.id}, {bucket_name: req.body.bucket_name, photo_path: req.body.photo_path})
			.exec(function(err, resut){
				
				if(err){
					return res.json(401, {err: err});
				}

				return res.json(200, {});
			});

		
	},

	getUsers: function (req, res) {

		Users.find().exec(function (err,users){

			if(err)
				return res.serverError(err);

			if(users)
				return res.json(users);
			
		});	

	},

	
};

