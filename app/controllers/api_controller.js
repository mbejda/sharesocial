var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , ApiController = new Controller()
  , Account = require('../models/account')
  , couponHelper = require('../helper/couponHelper');


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


ApiController.created = function()
{

var self = this;
var uid = self.param('uid');
var limit = self.param('limit') || 10;
var offset = self.param('offset') || 0;
var cc = new couponHelper();
cc.limit(limit).offset(offset).uid(uid).populateCreatedCoupons(function(e,u){
self.res.jsonp({response:u});
});
}
ApiController.shared = function()
{
var self = this;
var uid = self.param('uid');
var limit = self.param('limit') || 10;
var offset = self.param('offset') || 0;
var cc = new couponHelper();
cc.limit(limit).offset(offset).uid(uid).populateSharedCoupons(function(e,u){
self.res.jsonp({response:u});
});
}

ApiController.all = function()
{
var self = this;
var cc = new couponHelper();
var limit = self.param('limit') || 10;
cc.limit(limit).offset(self.param('offset')).find(function(e,u){
self.res.jsonp({response:u});
});
}

module.exports = ApiController;
