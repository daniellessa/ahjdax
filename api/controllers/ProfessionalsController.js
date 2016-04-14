/**
 * ProfessionalsController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getUsersProfessionals: function (req, res) {

		//Professionals.find({property_id: req.query.property_id})
		Professionals.find()
		.populate('users')
		.populate('properties')
		.populate('professions')
		.exec(function (err,users){

			if(err)
				return res.serverError(err);

			if(users)
				return res.json(users);
			
		});	

	},
	
};

