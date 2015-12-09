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
	    	// circular reference on a single level
	    PartBOMRelationship.count({parentPart: properties['partReference'],partReference:properties['parentPart']}).exec(function(err, found){
	    	if (found >0)  return res.badRequest("found circular reference on level 0");	
		    // if everything ok => create the relationship and add it to the partBomRelationships collection
		    /* global PartBOMRelationship */
		    PartBOMRelationship.create(properties).exec(function (err, partBomRelationship) {
		    	if (err) return res.badRequest(err);
		    	Part.findOne(properties['parentPart']).populate('partBOMRelationships').exec(function(err,part){
		    		if (err) return res.badRequest(err);
		    		res.ok(part);
		    	});
    		});
	    });
	},
	
	updatePartBOMRelationship : function(req,res){
	    // get parameters
	    
	    // test rules
	    
	    // if everything ok => update the relationship and add it to the partBomRelationships collection
	    
	},
	
	versionPart: function(req,res){
		
	},
	
	diffParts : function (req,res){
		var jsondiffpatch = require('jsondiffpatch').create();
		  
		// get comparaison origin
		var originId = req.param('leftid');
		// get comparaison target
		var targetId = req.param('rightid');
		
		var partDiff = {};
		
		Part.findOne(originId).populate('partBOMRelationships').exec(function(err,originPart){
			Part.findOne(targetId).populate('partBOMRelationships').exec(function(err,targetPart){
				// run diff feature
				var delta = jsondiffpatch.diff(originPart, targetPart);
				// partDiff = diff(originPart,targetPart);
				res.json(delta);
			});
		});
	},
	updatePart : function(req,res){
		var partId = req.param('id');
		Part.update({'id': partId},req.allParams()).exec(function(err,part){
			if (err){res.json(err)};
			res.json(part);
		});
	},
	getPartBOM : function(req,res){
		var partId = req.param('id');
		Part.findOne(partId).exec(function(err,part){
			PartBOMRelationship.find({'parentPart':partId}).populate('partReference').exec(function(err,BOMparts){
				part.BOMparts = BOMparts;
				res.json(part);
			});
		});
		
	},
	createPart : function(req,res){
		Part.create(req.allParams()).exec(function(err,part){
			res.json(part);
		});
	}
	
};

