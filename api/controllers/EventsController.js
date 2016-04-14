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
				return res.json(404, {err: err});
			}

			if(events){
				return res.json(events);
			}
		});
	},

	saveEvent: function(req, res) {

		//validar disponibilidade de horario antes de agendar

		// Events.find().exec(function(err, events){

		// 	for (var i = 0; i < events.length; i++) {
				
		// 		if(events[i].startAt == req.body.startAt){

		// 		}
		// 	};

		// });

		console.log("Entrou saveEvent");

		Events.create(req.body).exec(function(err,event){

			if(err){
				return res.json(401, {erro: err});
			}

			return res.json(200, {});
		});
	},
	
};

