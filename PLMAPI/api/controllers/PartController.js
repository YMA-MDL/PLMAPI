/**
 * PartController
 *
 * @description :: Server-side logic for managing parts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addPartBOMRelationship: function(req,res){
	    // get parameters

	    var properties = req.allParams();
	     properties['parentPart'] = properties.id;
	     properties['partReference'];
	     delete properties['id'];
	    // test rules
	    	// if ids are identical
	    if (properties.parentPart === properties.partReference) return res.badRequest();
	    	// if it creates a circular reference 
	    	// TODO
	    
	    
	    // if everything ok => create the relationship and add it to the partBomRelationships collection
	    /* global PartBOMRelationship */
	    PartBOMRelationship.create(properties).exec(function (err, partBomRelationship) {
	    	if (err) return res.badRequest(err);
	    	Part.findOne(properties['parentPart']).exec(function(err,part){
	    		if (err) return res.badRequest(err);
	    		res.ok(part);
	    	});
	    });
	    
	},
	
	updatePartBOMRelationship : function(req,res){
	    // get parameters
	    
	    // test rules
	    
	    // if everything ok => update the relationship and add it to the partBomRelationships collection
	    
	}
	
	
};

