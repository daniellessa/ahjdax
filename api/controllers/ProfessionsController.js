/**
 * ProfessionsController
 *
 * @description :: Server-side logic for managing professions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getProfessions: function(req, res){

		Professions.find().exec(function (err,professions){

			if(err)
				return res.serverError(err);

			if(professions)
				return res.json(professions);
			
		});	

	},
	
};

