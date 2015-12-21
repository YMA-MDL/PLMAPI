/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAccountList : function(req,res){
	    Account.find().exec(function(err,data){
	        res.json(data);
	    });
	},
	getAccountDetail : function(req,res){
	    
	},
	createAccount : function(req,res){
	    
	}
};

