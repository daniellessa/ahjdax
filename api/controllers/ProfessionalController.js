
/**
 * ProfessionalsController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
var bcrypt = require('bcryptjs');

module.exports = {


	create: function(req, res) {
		var professional = req.body;
		if(professional == null && typeof professional === 'undefined')
		{
			return res.json(404, {err: 'bad request #PC001'});
		}
		async.waterfall([
			function createProfessional (step) {
				Professional.create(professional).exec(function(err, professional){
					if(err)
					{
						return res.json(500, {err: 'fail create #PC002'});
					}
					 return step(null, professional);
				});
			},
		], function result(err, professional) {
			if (err)
				return res.negotiate(err);

			var jwt = jwToken.issue({professional});
			return res.json(200, {
				professional: professional, 
				token: jwt
			});
		});
	},
	getProfessionalsByProperty: function(req, res) {
	 	var propertyId = req.param('propertyId');
	 	var arrayIds = [];
		async.waterfall([
			function filterProfessionals(step) {
				PropertyHasUser.find({properties_id: propertyId, relationship: 'professional'})
				.exec(function(err, list){
					if(err)
					{
						return res.json(500, {err: 'server fail #PC003'});
					}
					arrayIds = _.map(list, 'user');
					step(null, arrayIds);
				});
			},
			function findFilteredProfessionals(arrayIds, step) {
				Professional.find({users_id: arrayIds})
				.populate('user')
				.populate('profession')
				.exec(function(err, professionals){
					if(err)
					{
						return res.json(500, {err: 'server fail #PC0004'});
					}
					step(null, professionals);
				});
			},
			function addImagesSigned (professionals, step) {
				for (var i = 0; i < professionals.length; i++) {
					professionals[i].user.url = Image.getSignedURL(professionals[i].user.photoPath);
				};
				step(null, professionals);
			},
			function removeSenditiveInfo(professionals, step) {
				for (var i = 0; i < professionals.length; i++) {
					delete professionals[i].password;
					delete professionals[i].createdAt;
					delete professionals[i].updatedAt;
				};

				step(null, professionals);
			},

		], function result(err, professionals){
			if (err)
				return res.negotiate(err);

			return res.json(professionals);
		});

	},
	getProfessional: function(req, res) {
		Professional.findOne({id: req.param('id')})
		.populate('profession')
		.populate('user')
		.exec(function(err, professional){
			if(err)
			{
				return res.negotiate(err);
			}
			return res.json(professional);
		});
	},


}