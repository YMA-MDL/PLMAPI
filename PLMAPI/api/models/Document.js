/**
* Document.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
     account : {
          model: 'account',
          required: false // true if used for multiaccount publishing
      },
      number: {
          type: 'string',
          unique: true,
          required: true
      },
      state: {
          type: 'string',
          enum: ['draft','in review', 'released', 'in change', 'superseded', 'obsolete'],
          defaultsTo: 'draft',
          required: true
      },
      description : {
          type: 'text'
      },
      name: {
          type: 'string',
          required: true
      },
      owner:{
            model:'user'
       },
      partUsage: {
          collection : 'part',
          via : 'partDocuments'
      }
      
  }
};


