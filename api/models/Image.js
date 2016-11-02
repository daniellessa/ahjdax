/**
 * Image.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
var s3 = new AWS.S3();

module.exports = {

  tableName: 'images',
  autoCreatedAt: false, //current (timezone-agnostic) timestamp
  autoUpdatedAt: false, //current (timezone-agnostic) timestamp

  attributes: {

    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    bucketName: { type: 'string' },

    photoPath: { type: 'string' },

    //Relations

    property: {
      model: 'property',
      via: 'id',
      columnName: 'properties_id'
    }

  },

  getSignedURL: function(path) {
    if ( path === null )
    {
      return null;
    }
    else
    {
      var params = {Bucket: 'agendamobile', Key: path};
      return s3.getSignedUrl('getObject', params);
    }
  }


};

