/**
 * jwToken
 *
 */
 var request = require('request'); 

 module.exports = {


 	send: function(type, from, ids, title, message, property, cb){

 		console.log('NEW DOWNSTREAM MESSAGE');

 		var date = new Date();
 		var currentDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
 		var hour = date.getHours() + ':' + date.getMinutes();
 		var targetIds = "";
 		var propertyId = property;
 		var id = Math.floor((Math.random() * 10000) + 1);

 		for (var i = 0; i < ids.length; i++) {
 			targetIds += "\""+ids[i]+"\",";
 		};

		var options = {
	        url : 'https://gcm-http.googleapis.com/gcm/send',
	        method : 'POST',
	        headers : {
	        	'Content-Type':'application/json',
				'Authorization':'key=AIzaSyAWd9G1zvZ4WBuMe0_LvnSE0hqQyQer9ds'
	        },
	        body : "{\"data\":{\"score\":\"5x1\",\"id\":\""+id+"\",\"date\":\""+currentDate+"\",\"time\":\""+hour+"\",\"type\":\""+type+"\",\"title\":\""+title+"\",\"message\":\""+message+"\",\"from_registred_id\":\""+from+"\",\"property_id\":\""+propertyId+"\",},\"registration_ids\":["+targetIds+"]}"
 		};

 		//console.log(options.body);

 		request(options,cb);
 	},


 };



 	



 