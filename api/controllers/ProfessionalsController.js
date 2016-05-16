/**
 * ProfessionalsController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getUsersProfessionals: function (req, res) {

		var allUsers = [];
		console.log(req.query.service_id);

		Professionals.find({property_id: req.query.property_id})
		.populate('users')
		.populate('properties')
		.populate('professions')
		.exec(function (err,users){

			if(err)
				return res.serverError(err);

			allUsers = users;

			UsersHasServices.find({service_id: req.query.service_id})
				.populate('users')
				.exec(function(err, services){

					if(err){
						return res.json(404, {erro: 'fail in server #PC001'});
					}
					
					var finalList = [];

					for (var i = 0; i < allUsers.length; i++) {
						for (var x = 0; x < services.length; x++) {

							console.log(allUsers[i].users.id +" - "+ services[x].users.id);

							if(allUsers[i].users.id == services[x].users.id){
								finalList.push(allUsers[i]);
							}
						};
					};

					console.log(finalList);
					return res.json(finalList);


				});
		});	
	},
	
};

