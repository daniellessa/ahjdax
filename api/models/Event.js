/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'events',
  autoCreatedAt: true, //current (timezone-agnostic) timestamp
  autoUpdatedAt: true, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    title: { type: 'string' },

    startAt: { 
      type: 'datetime',
      required: true
    },

    endsAt: { 
      type: 'datetime',
      required: true
    },

    realStartAt: { 
      type: 'datetime'
    },

    realEndsAt: { 
      type: 'datetime'
    },

    //Relations

    professional: {
      model: 'professional',
      via: 'id',
      columnName: 'professionals_id'
    },

    user: {
      model: 'user',
      via: 'id',
      columnName: 'users_id'
    },

    service: {
      model: 'service',
      via: 'id',
      columnName: 'services_id'
    },

    property: {
      model: 'property',
      via: 'id',
      columnName: 'properties_id'
    },

    // rating: {
    //   model: 'ratingevent',
    //   via: 'event'
    // },

    // justification: {
    //   model: 'justification',
    //   via: 'event'
    // },

    type: { 
      model: 'eventtype',
      via: 'id',
      columnName: 'type_id'
    },

    status: {
      model: 'status',
      via: 'id',
      columnName: 'status_id'
    },

  },

  convertDateToSql: function(date) {
    var aux = new Date(date);
    var year = aux.getFullYear()+'';
    var month = (aux.getMonth()+1)+'';
    var day = aux.getDate()+'';
    var hour = aux.getHours()+'';
    var minute = aux.getMinutes()+'';

    if(month.length == 1){
      month = '0'+month;
    }
    if(day.length == 1){
      day = '0'+day;
    }
    if(hour.length == 1){
      hour = '0'+hour;
    }
    if(minute.length == 1){
      minute = '0'+minute;
    }
    var sql = year+'-'+month+'-'+day+' '+hour+':'+minute+':00';
    return sql;
  }

};

