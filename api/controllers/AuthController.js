/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
var async = require('async');

module.exports = {

	authProfessional: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if ( !email || !password )
		{
			return res.json(401, {err: 'email and password required'});
		}

		async.waterfall([

			function checkProfessionalExistence(step) {
				Professional
					.findOne({email: email})
					.populate('user')
					.populate('profession')
					.populate('properties')
					.exec(function(err, professional){

					if(err)
					{
						err.status = 401;
						return step(err);
					}
					if(!professional)
					{
						err = {};
						err.status = 401;
						return step(err);
					}
					step(null, professional);
				});
			},
			function addImagesSigned (professional, step) {
				professional.user.url = Image.getSignedURL(professional.user.photoPath);
				step(null, professional);
			},
			function validadeCredentials(professional, step) {
				Professional
					.comparePassword(password, professional, function(err, valid){

					if(err)
					{
						err.status = 403;
						return step(err);
					}

					if (!valid)
					{
						err = {};
						err.status = 401;
						return step(err);
					}

					step(null,professional);

				});
			},
			function populateRoles(professional, step) {
				User.findOne({id: professional.user.id})
					.populate('roles')
					.exec(function(err, user){
					if(err)
					{
						err.status = 403;
						return step(err);
					}
					professional.user.roles = user.roles;
					step(null, professional);
				});
			},
			function hideSensitiveUserInfos(professional,step) {
				delete professional.password;
				delete professional.user.deviceToken;
				step(null, professional);
			},
			function buildToken(professional,step) {
				var token = jwToken.issue(professional);
				step(null,token,professional);
			}
		], function result(err,token, professional) {
			if (err)
				return res.negotiate(err);

			return res.json({
				professional: professional,
				token: token
			});
		});
	},

	authUser: function(req, res) {

	},

	authGoogleOrFacebook: function(req, res) {

		var email = req.body.email;
		var device_token = req.body.registration_id;
		var findedUser;
		var roles;

		if ( typeof req.body.roles !== 'undefined' )
		{
			roles = req.body.roles;
			delete req.body.roles;
		}

		if (!email)
		{
			return res.json(401, {err: 'email required'});
		}

		async.waterfall([

			function checkUserExistenceOrCreate(step) {

				Users.findOne({email: email, })
					.populate('roles')
					.exec(function(err, user){

						if(err)
						{
							err.status = 401;
							return step(err);
						}

						if(!user)
						{
							Users.create(req.body).exec(function(err, newUser){

								if(err)
								{
									err.status = 401;
									return step(err);
								}

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

									if(err)
									{
										err.status = 401;
										return step(err);
									}

									step(null, newUser);
								});

							});
						}

						step(null, user);
				});
			},

			function updateDeviceToken(user, step) {

				if(!device_token && device_token !== 'undefined')
				{
					console.log('registration_id: ', device_token);
					Users.compareAndUpdateDeviceToken(device_token, user);
				}

				step(null, user);
			},

			function hideSensitiveUserInfos(user,step) {
				delete user.password;
				delete user.registration_id;

				step(null, user);
			},

			function buildToken(user,step) {
				var token = jwToken.issue(user);
				findedUser = user;
				step(null,token);
			}



		], function result(err,token) {
			if (err)
				return res.negotiate(err);

			return res.json({
				user: findedUser,
				token: token
			});
		});




		Users.findOne({email: email, })
			.populate('roles')
			.exec(function(err, user) {


			if (!user)
			{
				var roles;

				if ( typeof req.body.roles !== 'undefined' )
				{
					roles = req.body.roles;
					delete req.body.roles;
				}

				Users.create(req.body).exec(function(err, user) {

					if(err)
						return res.json(404, {err: 'Error: #AC004'});
					

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
								return res.json(404, {err: 'Error: #AC005'});
							

							var newuser = {
								id: user.id, 
								registration_id: user.registration_id, 
								email: user.email, 
								name: user.name, 
								sex: user.sex, 
								photo_path: user.photo_path,
								bucket_name: user.bucket_name,
								roles: null
							}


							Userrole.find({user_id: newuser.id})
								.exec(function(err, roles){

									if (err)
										return res.json(404, {err: 'Error: #AC007'});

									newuser.roles = roles

									console.log(newuser);

									return res.json({
										user: newuser,
										token: jwToken.issue({
										id: newuser.id, 
										registration_id: newuser.registration_id, 
										email: newuser.email, 
										name: newuser.name, 
										sex: newuser.sex, 
										photo_path: newuser.photo_path,
										bucket_name: newuser.bucket_name,
										roles: newuser.roles						
										})
									});

								});

						});

						
					}
				});

			}
			else
			{
				Users.update({id: user.id},{registration_id: req.body.registration_id, photo_path: req.body.photo_path})
					.exec(function(err, updatedUser) {

					if (err)
						return res.json(404, {err: 'Error: #AC006'});

					var newuser = {
						id: updatedUser[0].id, 
						registration_id: updatedUser[0].registration_id, 
						email: updatedUser[0].email, 
						name: updatedUser[0].name, 
						sex: updatedUser[0].sex, 
						photo_path: updatedUser[0].photo_path,
						bucket_name: updatedUser[0].bucket_name,
						roles: null
					}


					Userrole.find({user_id: newuser.id})
						.exec(function(err, roles){

							if (err)
								return res.json(404, {err: 'Error: #AC007'});

							newuser.roles = roles

							console.log(newuser);

							return res.json({
								user: newuser,
								token: jwToken.issue({
								id: newuser.id, 
								registration_id: newuser.registration_id, 
								email: newuser.email, 
								name: newuser.name, 
								sex: newuser.sex, 
								photo_path: newuser.photo_path,
								bucket_name: newuser.bucket_name,
								roles: newuser.roles						
								})
							});

						});

				});
			}				
		});
	},

	
};

