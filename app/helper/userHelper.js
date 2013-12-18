var Account = require('../models/account');
var Async = require('async');


var userModule = function(user,cb)
{
var self = this;
self.user = user;
var model;
var json;
self.model = function()
{
	return model;
}
self.json = function()
{
	return self.json;
}

self.action = function(action,callback)
{

},
self.getModel = function(user,callback)
{

  Account.findOne({'_id' : user._id}, function(err, user) {
    if (err) { 
    	console.log('user model error');
    	return callback(err) 
    }
    model = user;

callback(user)
  });
}
self.getJSON = function(user, callback)
{
callback(user);
}

if(user)
{

Async.series([function(callback){

self.getModel(user,callback)


}],function(m){

	cb(m);
})

}
return {
	action : self.action,
	json : self.getJSON,
	getModel : self.getModel,
	model : self.model

}
}

module.exports= userModule;