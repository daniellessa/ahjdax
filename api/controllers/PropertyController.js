/**
 * PropertyController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {
	getProperties: function(req, res) {
		var id = req.token.user.id;
		console.log(req.token);
		async.waterfall([
			function findProperties (step) {
				PropertyHasUser.find({users_id: id})
				.populate('property')
				.exec(function(err, properties){
					if(err)
					{	
						return res.negotiate(err);
					}
					step(null, properties);
					// return res.json(properties);
				});
			},
			function clearJson(properties, step) {
				for (var i = 0; i < properties.length; i++) {
					properties[i] = properties[i].property;
				};
				step(null, properties);
			},
			function addImagesSigned (properties, step) {
				for (var i = 0; i < properties.length; i++) {
					properties[i].url = Image.getSignedURL(properties[i].photoPath);
				};
				step(null, properties);
			},
		], function result(err, properties) {
			if (err)
				return res.negotiate(err);

			return res.json(properties);
		});
	},
	getWorkDays: function(req, res) {
		var propertyId = req.param('propertyId');

		WorkDay.find({professionals_id: req.token.id, properties_id: propertyId})
			.populate('property')
			.exec(function(err, properties){
				if(err)
				{	
					console.log(err);
					return res.json(400, {err: 'error: #PC002'});
				}
				return res.json(properties);
			});
	},

}