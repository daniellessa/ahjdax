/**
 * ServicesController
 *
 * @description :: Server-side logic for managing Services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getServicesForIdProperty: function(req, res){

		if(!req.query.property_id)
		{
			return res.json(404, {erro: 'Bad request #SC001'});
		}

		Services.find({property_id: req.query.property_id}).exec(function(err, results){

			if(err)
			{
				console.log(err);
				return res.json(403, {erro: 'Error #SC002'});
			}

			return res.json(results);
		});


	}

	
	
};

