/**
 * ServiceController
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {

	getServicesByProfessional: function(req, res) {
		var professionalId = req.param('professionalId');
		ProfessionalHasService.find({professional: professionalId})
			.populate('service')
			.exec(function(err, services){
				if(err)
				{
					return res.json(404, {err: 'Server failed #SC001'});
				}

				res.json(services);
			});
	},
	getServicesByProperty: function(req, res) {
		var propertyId = req.param('propertyId');
		PropertyHasService.find({properties_id: propertyId})
			.populate('service')
			.exec(function(err, services){
				if(err)
				{
					console.log(err);
					return res.json(404, {err: 'Server failed #SC002'});
				}

				res.json(services);
			});
	},
	getAllServices: function(req, res) {
		Service.find()
			.exec(function(err, services){
				if(err)
				{
					console.log(err);
					return res.json(404, {err: 'Server failed #SC003'});
				}

				res.json(services);
			});
	},
	create: function(req, res) {

		Service.create(req.body).exec(function(err, result){
			if(err)
			{
				return res.json(404, {err: 'Server failed #SC004'});
			}
			return res.json(200, result);
		});
	},
	createPropertyHasService: function(req, res) {
		console.log(req.body)
		PropertyHasService.create(req.body).exec(function(err, result){
			if(err)
			{	
				console.log(err)
				return res.json(404, {err: 'Server failed #SC005'});
			}
			return res.json(200, result);
		});
	},
	getOnePropertyHasService: function(req, res) {
		var id = req.param('id');
		PropertyHasService.findOne({id: id})
		.populate('service')
		.exec(function(err, service){
			if(err)
			{
				return res.json(404, {err: 'Server failed #SC006'});
			}
			return res.json(200, service);
		});
	},
	updatePropertyHasService: function(req, res) {
		PropertyHasService.update(
			{id: req.body.id}, 
			{oldPrice: req.body.oldPrice, price: req.body.price, description: req.body.description}
		)
		.exec(function(err, service){
			if(err)
			{	
				console.log(err);
				return res.json(404, {err: 'Server failed #SC007'});
			}
			return res.json(200, service);
		});
	},
	deletePropertyHasService: function(req, res) {
		PropertyHasService.destroy({id: req.param('id')}).exec(function(err){
			if(err)
			{
				return res.negotiate(err);
			}
			return res.ok();
		});
	},
	getProfessionalHasService: function(req, res) {
		ProfessionalHasService.find({professionals_id: req.param('id')})
		.populate('service')
		.exec(function(err, services){
			if(err)
			{
				return res.negotiate(err);
			}
			return res.json(services);
		});
	},
}