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

			if(err){
				console.log('Erro #EC001: ', err);
				return res.json(404, {err: 'Server error #EC001'});
			}

			if(events){
				return res.json(events);
			}
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
				console.log('Erro #EC002: ', err);
				return res.json(404, {err: 'Server error #EC002'});
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

			if(err){
				console.log('Erro #EC003: ', err);
				return res.json(404, {err: 'Server error #EC003'});
			}

			if(events){
				return res.json(events);
			}
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

			if(err){
				console.log('Erro #EC004: ', err);
				return res.json(404, {err: 'Server error #EC004'});
			}

			if(events){
				return res.json(events);
			}
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

			if(err){
				console.log('Erro #EC005: ', err);
				return res.json(404, {err: 'Server error #EC005'});
			}

			if(events){
				return res.json(events);
			}
		});
	},
	
};

