/**
 * NotifyController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {


	newAssociation: function(req, res){

		var newUser;
		var userId = req.token.id;
		var propertyId = req.query.property_id;

		Users.findOne({id: userId})
			.exec(function(err, user){

				if(err)
				{
					console.log('Error: #SN001', err);
					return res.json(404, {err: 'Error: #SN001'});
				}

				newUser = user;

				Userrole.find({ or : 
								[
									{role_id: 2, property_id: propertyId},
									{role_id: 1}
								]
							})
					.populate('users')
					.exec(function(err, admins){

						if(err)
						{
							console.log('Error: #SN002', err);
							return res.json(404, {err: 'Error: #SN002'});
						}

						listIds = [];

						for (var i = 0; i < admins.length; i++) {
							listIds.push(admins[i].users.registration_id)
						};


						downstreamMessage.send(1, newUser.registration_id, listIds, 'Novo Usuário', 'Novo usuário '+ newUser.name +' cadastrado em seu estabelecimento!', null, function(err, response){

							if (err) 
							{
								console.log('Error: #SN003', err);
								return res.json(404, {error: 'Error #SN003'});
							}

							return res.json(response);
						});

					});
			});

	},

	newEvent: function(req, res){

		var client;
		var forIds = [];

		Users.findOne({id: req.token.id})
			.exec(function(err, user){

				if(err)
				{
					console.log('Error: #SN004', err);
					return res.json(404, {err: 'Error: #SN004'});
				}

				client = user;

				Users.findOne({id: req.query.professional_id})
					.exec(function(err, professinal){

						if(err)
						{
							console.log('Error: #SN005', err);
							return res.json(404, {err: 'Error: #SN005'});
						}

						forIds.push(professinal.registration_id);

						Userrole.find({})
							.populate('users')
							.exec(function(err, admins){

							if(err)
							{
								console.log('Error: #SN006', err);
								return res.json(404, {err: 'Error: #SN006'});
							}

							for (var i = 0; i < admins.length; i++) {
								forIds.push(admins[i].users.registration_id);
							};

								downstreamMessage.send(2, client.registration_id, forIds, 'Novo Agendamento', 'Novo serviço agendado por '+ client.name, null, function(err, response){

								if (err) 
								{
									console.log('Error: #SN007', err);
									return res.json(404, {error: 'Error #SN007'});
								}

								return res.json(response);
							});

						});
				});
			});

	},

	promotionsByUser: function(req, res){

	},

	canceledEventByUser: function(req, res){

	},

	canceledEventByProfessional: function(req, res){

	},

	finalizedEvent: function(req, res){

	},

	imGoingToBeLateUser: function(req, res){

	},

	imGoingToBeLateProfessional: function(req, res){

	},

	updatedEvent: function(req, res){

	},


}
