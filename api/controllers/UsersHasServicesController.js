/**
 * UsersHasServicesController
 *
 * @description :: Server-side logic for managing Usershasservices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getServicesForUserProfessional: function(req, res){

		if(!req.query.professional_id){
			return res.json(401, {err: 'bad request'});
		}

		var idProfessional = req.query.professional_id;
		console.log('aqui blz');
		UsersHasServices.find({user_id: idProfessional})
		.populate('services')
		.exec(function(err, services){

			if(err){
				return res.json(401,{err: err});
			}

			return res.json(services)


		});
	},
	
};

