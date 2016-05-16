/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getEvents: function(req, res) {

		
		Events.find({professionals_id: req.query.professionals_id, day: req.query.day})
		.populate('users')
		.populate('services')
		.populate('professionals')
		.exec(function(err, events){

			if(err)
			{
				console.log('Erro #EC000: ', err);
				return res.json(404, {err: 'Server error #EC000'});
			}

			var servicesIds = [];
			for (var i = 0; i < events.length; i++) {
				if(events[i].services.property !== 'undefined')
					servicesIds.push(events[i].services.property);
			};

			Properties.find({id: servicesIds})
				.exec(function(err, properties){

					if(err)
					{
						console.log('Erro #EC001: ', err);
						return res.json(404, {err: 'Server error #EC001'});
					}

					for (var i = 0; i < events.length; i++) {
						for (var x = 0; x < properties.length; x++) {
							if(events[i].services.property == properties[x].id){
								events[i].services.property = properties[x];
							}
						};
					};

					//daqui
					var ids = [];
					for (var i = 0; i < events.length; i++) {
						
						if(events[i].professionals !== 'undefined')
							ids.push(events[i].professionals.users);
					};

					Users.find({id: ids})
						.exec(function(err, users){

							if(err)
							{
								console.log('Erro #EC002: ', err);
								return res.json(404, {err: 'Server error #EC002'});
							}

							for(var i = 0; i < users.length; i++){

								for (var x = 0; x < events.length; x++) {

									if(events[x].professionals.users == users[i].id)
									{
										events[x].professionals.users = users[i];
									}
								};
							}

							return res.json(events);
						});
					// pra ca
				});
		});
	},

	saveEvent: function(req, res) {

		//validar disponibilidade de horario antes de agendar

		// Events.find({day: req.body.day})
		// .exec(function(err, events){

		// 	for (var i = 0; i < events.length; i++) {
				
		// 		if(events[i].startAt == req.body.startAt){

		// 		}
		// 	};

		// });

		console.log("Entrou saveEvent");

		Events.create(req.body).exec(function(err,event){

			if(err){
				console.log('Erro #EC003: ', err);
				return res.json(404, {err: 'Server error #EC003'});
			}

			return res.json(200, {});
		});
	},

	getEventsForUser: function(req, res) {

		
		Events.find({users_id: req.token.id})
		.populate('users')
		.populate('services')
		.populate('professionals')
		.exec(function(err, events){

			if(err)
			{
				console.log('Erro #EC004: ', err);
				return res.json(404, {err: 'Server error #EC004'});
			}

			Users.find()
				.exec(function(err, users){

					if(err)
					{
						console.log('Erro #EC005: ', err);
						return res.json(404, {err: 'Server error #EC005'});
					}

					for(var i = 0; i < users.length; i++){

						for (var x = 0; x < events.length; x++) {

							if(events[x].professionals.users == users[i].id)
							{
								events[x].professionals.users = users[i];
							}
						};
					}

					return res.json(events);
				});
		});
	},

	getEventsForUserNotExpired: function(req, res) {

		var currentDate = new Date();
		
		Events.find({users_id: req.token.id})
		.populate('users')
		.populate('services')
		.populate('professionals')
		.where({'startAt': {'>=': currentDate}})
		.sort('startAt DESC')
		.exec(function(err, events){

			if(err)
			{
				console.log('Erro #EC006: ', err);
				return res.json(404, {err: 'Server error #EC006'});
			}

			var servicesIds = [];
			for (var i = 0; i < events.length; i++) {
				if(events[i].services.property !== 'undefined')
					servicesIds.push(events[i].services.property);
			};

			Properties.find({id: servicesIds})
				.exec(function(err, properties){

					if(err)
					{
						console.log('Erro #EC007: ', err);
						return res.json(404, {err: 'Server error #EC007'});
					}

					for (var i = 0; i < events.length; i++) {
						for (var x = 0; x < properties.length; x++) {
							if(events[i].services.property == properties[x].id){
								events[i].services.property = properties[x];
							}
						};
					};

					//daqui
					var ids = [];
					for (var i = 0; i < events.length; i++) {
						
						if(events[i].professionals !== 'undefined')
							ids.push(events[i].professionals.users);
					};

					Users.find({id: ids})
						.exec(function(err, users){

							if(err)
							{
								console.log('Erro #EC008: ', err);
								return res.json(404, {err: 'Server error #EC008'});
							}

							for(var i = 0; i < users.length; i++){

								for (var x = 0; x < events.length; x++) {

									if(events[x].professionals.users == users[i].id)
									{
										events[x].professionals.users = users[i];
									}
								};
							}

							return res.json(events);
						});
					// pra ca
				});
		});
	},

	getEventsForUserExpired: function(req, res) {

		
		var currentDate = new Date();
		
		Events.find({users_id: req.token.id})
		.populate('users')
		.populate('services')
		.populate('professionals')
		.where({'startAt': {'<': currentDate}})
		.sort('startAt DESC') 
		.exec(function(err, events){

			if(err)
			{
				console.log('Erro #EC009: ', err);
				return res.json(404, {err: 'Server error #EC009'});
			}

			var servicesIds = [];
			for (var i = 0; i < events.length; i++) {
				if(events[i].services.property !== 'undefined')
					servicesIds.push(events[i].services.property);
			};

			Properties.find({id: servicesIds})
				.exec(function(err, properties){

					if(err)
					{
						console.log('Erro #EC010: ', err);
						return res.json(404, {err: 'Server error #EC010'});
					}

					for (var i = 0; i < events.length; i++) {
						for (var x = 0; x < properties.length; x++) {
							if(events[i].services.property == properties[x].id){
								events[i].services.property = properties[x];
							}
						};
					};

					//daqui
					var ids = [];
					for (var i = 0; i < events.length; i++) {
						
						if(events[i].professionals !== 'undefined')
							ids.push(events[i].professionals.users);
					};

					Users.find({id: ids})
						.exec(function(err, users){

							if(err)
							{
								console.log('Erro #EC011: ', err);
								return res.json(404, {err: 'Server error #EC011'});
							}

							for(var i = 0; i < users.length; i++){

								for (var x = 0; x < events.length; x++) {

									if(events[x].professionals.users == users[i].id)
									{
										events[x].professionals.users = users[i];
									}
								};
							}

							return res.json(events);
						});
					// pra ca
				});

		
		});
	},
	
};

