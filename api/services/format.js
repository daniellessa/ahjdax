



 module.exports = {

 	date: function(date){

 		var day = date.getDate().toString();
 		var month = (date.getMonth() +1).toString();
 		var year = date.getFullYear().toString();

 		if(day.length == 1)
 		{
 			day = '0'+day;
 		}


 		if(month.length == 1)
 		{
 			month = '0'+month;
 		}

 		return day+"/"+month+"/"+year;
 	},


 	dateFull: function(date){

 		var day = date.getDate().toString();
 		var month = (date.getMonth() +1).toString();
 		var year = date.getFullYear().toString();
 		var hour = date.getHours().toString();
 		var minute = date.getMinutes().toString();

 		if(day.length == 1)
 		{
 			day = '0'+day;
 		}

 		if(month.length == 1)
 		{
 			month = '0'+month;
 		}

 		if(hour.length == 1)
 		{
 			hour = '0'+hour;
 		}

 		if(minute.length == 1)
 		{
 			minute = '0'+minute;
 		}

 		return day+"/"+month+"/"+year+" às "+hour+":"+minute+" h";
 	}



 }