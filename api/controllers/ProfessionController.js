/**
 * ProfessionController.js
 *
 * @description :: Server-side logic for managing Professionals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {
	getProfessions: function(req, res) {

		Profession.find().exec(function(err, professions){
			if(err)
			{	
				return res.json(400, {err: 'error: #PC001'});
			}
			return res.json(professions);
		});
	},

}