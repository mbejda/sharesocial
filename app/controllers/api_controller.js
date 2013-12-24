var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var ApiController = new Controller();
var Account = require('../models/account');
var couponHelper = require('../helper/couponHelper');


ApiController.index = function()
{
	var self = this;
	var uid = this.param('uid');
	var limit = this.param('limit') || 10;
	var offset = this.param('offset') || 0;
//	var fid = this.param('fid');
var cc = new couponHelper();
if(uid != undefined)
{
cc.where({uid: uid}).limit(limit).offset(offset).find(function(e,u){
self.res.send(JSON.stringify(u))
});
}
if(uid == undefined)
{
cc.limit(limit).offset(offset).find(function(e,u){
self.res.send(JSON.stringify(u))
});
}
}
ApiController.all = function()
{

		var self = this;

	var cc = new couponHelper();

console.log(self.param('offset'))
cc.limit(10).offset(self.param('offset')).find(function(e,u){
self.res.jsonp({response:u});
});
}

module.exports = ApiController;
