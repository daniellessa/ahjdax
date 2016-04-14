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

		Users.findOne({ email: email, }).exec(function(err, user) {


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

	
};

