/**
 * UserController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {

	create: function(req, res) {
		var user = req.body;
		var propertyId = req.param('propertyId');

		console.log(propertyId);

		User.create(user).exec(function(err, user){
			if(err)
				return res.negotiate(err);

			var propertyhasuser = {
				users_id: user.id,
				properties_id: propertyId,
				relationship: "client"
			}

			PropertyHasUser.create(propertyhasuser).exec(function(err, result){
				if(err)
					return res.negotiate(err);

				return res.ok();
			});
		});
	},

	update: function(req, res) {

		var user = req.body;
		var userId = user.id;
		delete user.id;
		delete user.createdAt;
		delete user.updatedAt;

		User.update({id:userId}, user)
			.exec(function(err, result){
			if(err)
				return res.negotiate(err);

			return res.ok();
		});
	},

	deleteClient: function(req, res) {
		var clientId = req.param('id');

		PropertyHasUser
			.destroy({users_id:clientId})
			.exec(function(err, result){
				if(err)
					return res.negotiate(err);

				User
					.destroy({id:clientId})
					.exec(function(err, result){
						if(err)
							return res.negotiate(err);

						return res.ok();
					});

			});
	},

	getUsersByProperty: function(req, res) {
		var propertyId = req.param('propertyId');
		async.waterfall([
			function findUsers (step) {
				PropertyHasUser.find({relationship: 'client', properties_id: propertyId})
				.populate('user')
				.exec(function(err, users){
					if(err)
						return res.negotiate(err);

					step(null, users);
				});
			},
			function clearJson (users, step) {
				for (var i = 0; i < users.length; i++) {
					users[i] = users[i].user;
				};
				step(null, users);
			},
			function addImagesSigned (users, step) {
				for (var i = 0; i < users.length; i++) {
					users[i].url = Image.getSignedURL(users[i].photoPath);
				};
				step(null, users);
			},
		], function result(err, users) {
			if (err)
				return res.negotiate(err);

			return res.json(users);
		});

	},
}