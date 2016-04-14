/**
 * jwToken
 *
 */
 var request = require('request'); 

 var options = {
        url : 'https://gcm-http.googleapis.com/gcm/send',
        method : 'POST',
        headers : {
        	'Content-Type':'application/json',
			'Authorization':'key=AIzaSyAWd9G1zvZ4WBuMe0_LvnSE0hqQyQer9ds'
        },
 };

 

 module.exports = {


 	send: function(from, ids, message){

 		var data = {
			'data': {
			    'score': '5x1',
			    'time': '13:45',
			    'message': message,
			    'from_registred_id': from
			},
			'to' : ids
			
		}

 		function callback(error, response, data){
 			if(!error && response.statusCode == 200) {
 				var info = JSON.parse(body);
 			}
 		}

 		request(options,callback);
 	},

 	


 };



 	



 