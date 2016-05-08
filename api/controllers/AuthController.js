/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');

module.exports = {

	auth: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		console.log("Login: ", email +" - "+ password);

		if ( !email || !password )
		{
			return res.json(401, {err: 'email and password required'});
		}

		Users.findOne({ email: email, })
			.populate('roles')
			.exec(function(err, user) {


			if (!user)
				return res.json(401, {err: 'invalid email or password'});


			Users.comparePassword(password, user, function(err, valid) {

				if (err)
					return res.json(403, {err: 'forbidden'});
				

				if (!valid)
					return res.json(401, {err: 'invalid email or password'});
				
				
				return res.json({
					user: user,
					token: jwToken.issue({
					id: user.id, 
					registration_id: user.registration_id, 
					email: user.email, 
					name: user.name, 
					sex: user.sex, 
					photo_path: user.photo_path,
					bucket_name: user.bucket_name						
					})
				});
			});				
		});
	},

	authGoogleOrFacebook: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		console.log("Login: ", email +" - "+ password);

		if ( !email || !password )
		{
			return res.json(401, {err: 'email and password required'});
		}

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

