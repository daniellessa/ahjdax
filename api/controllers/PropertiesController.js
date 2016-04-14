/**
 * PropertiesController
 *
 * @description :: Server-side logic for managing Properties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	getProperties: function(req, res) {

		Properties.findOne({pin: req.query.pin}).exec(function(err, property){

			if(err){
				return res.json(404, {err: err});
			}

			if(property){
				return res.json(property);
			}
		});
	}
	
};

