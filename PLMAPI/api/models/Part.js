/**
* Part.js
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
      partBOMRelationships: {
          collection: 'PartBOMRelationship',
          via: 'parentPart'
      },
      referencedPart:{
          collection: 'PartBOMRelationship',
          via: 'partReference'
      },
      partDocuments : {
          collection: 'document',
          via: 'partUsage',
          dominant: true
      },
      isVersionnedBy:{
        collection: 'part',
        via: 'isVersionOf',
        dominant: true
      },
      Alias : function(){
        return this.number + ' - ' + this.name;
      },
      isVersionOf:{
        collection : 'part',
          via : 'isVersionnedBy'
      }
      
  }
};

