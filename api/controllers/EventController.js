/**
 * EventController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {

	createEvent: function(req, res) {

		console.log('createEvent => ', req.body)

		Event.create(req.body).exec(function(err, result){
			if(err)
			{
				console.log(err);
				return res.json(404, {err: 'server fail #EC001'})
			}

			return res.json(200, {});
		});
	},
	getEventsByProperty: function(req, res) {
		var professionalId = req.param('professionalId')
		var propertyId = req.param('propertyId');
		async.waterfall([
			function getEvents(step) {
				Event.find({where: 
					{
						properties_id: propertyId,
						professionals_id: professionalId,
						status_id: {'<':'5'}
					}
				})
				.populate('professional')
				.populate('user')
				.populate('service')
				.exec(function(err, events){
					if(err)
					{	
						return res.json(400, {err: 'error: #EC002'});
					}
					step(null, events);
				});
			},
			function convertDate(events, step) {
				for (var i = 0; i < events.length; i++) {
					events[i].startAt = Event.convertDateToSql(events[i].startAt);
					events[i].endsAt = Event.convertDateToSql(events[i].endsAt);
				};
				step(null, events);
			},
			function addImagesSigned (events, step) {
				for (var i = 0; i < events.length; i++) {
					if(events[i].user != null){
						events[i].user.url = Image.getSignedURL(events[i].user.photoPath);
					}
					
				};
				step(null, events);
			},
		], function result(err, events) {
			if (err)
				return res.negotiate(err);
			return res.json(events);
		});
	},
	updateEvent: function(req, res) {
		var eventId = req.body.id;
		var eventStartAt = req.body.startsAt;
		var eventEndsAt = req.body.endsAt;
		Event.update({id:eventId},{startAt: eventStartAt, endsAt: eventEndsAt})
			.exec(function(err, result){
				if(err)
				{
					return res.json(404, {err: 'server fail #EC003'});
				}
				console.log(result);
				if(!result)
				{
					return res.json(404, {err: 'server fail #EC004'});
				}
				return res.json(200, {});
		});
	},
	deleteEvent: function(req, res) {
		var eventId = req.body.id;
		Event.update({id:eventId},{status: 5})
			.exec(function(err, result){
				if(err)
				{
					return res.json(404, {err: 'server fail #EC005'});
				}
				console.log(result);
				if(!result)
				{
					return res.json(404, {err: 'server fail #EC006'});
				}
				return res.json(200, {});
		});
	},
	getEvent: function(req, res) {
		var eventId = req.param('eventId');
		Event.findOne({id: eventId})
		.populate('user')
		.populate('professional')
		.populate('service')
		.exec(function(err, event){
			if(err)
			{
				return res.json(404, {err: 'server fail #EC006'});
			}
			
			event.user.url = Image.getSignedURL(event.user.photoPath);
			delete event.user.password;
			delete event.professional.password;
			return res.json(event);
		});
	},
	checkAvailabilityStart: function(req, res) {
		var date = new Date(req.body.start);
		Event.findOne(
			{where: 
				{
					startAt: {'<': date},
					endsAt: {'>': date}
				}
			})
			.exec(function(err, result){
				if(err)
					return res.negotiate(err);
				if(result)
					return res.json(result);
		});
	},
	checkAvailabilityEnds: function(req, res) {
		var date = new Date(req.body.ends);
		Event.findOne(
			{where: 
				{
					startAt: {'<=': date},
					endsAt: {'>=': date}
				}
			})
			.exec(function(err, result){
				if(err)
					return res.negotiate(err);

				return res.json(result);
		});
	},

}