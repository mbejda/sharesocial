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
var offset = self.param('offset') || 0;
cc.limit(limit).offset(offset).find(function(e,u){
self.res.jsonp({response:u});
});
}


ApiController.create = function()
{
  var self = this;
  var data = this.param('data');
  var uid = this.param('uid');
  data['uid'] = this.req.user._id;
  data['created'] =  Math.round(+new Date()/1000);
  var couponH = new couponHelper();
  couponH.addToUser(data['uid']).create(data,function(e,coupon){
  	if(e)
  	{
  		   self.res.send({response:'error',message:e})
  		    return;
  	}
    self.res.send({response:'success',message:coupon})
  })
}


ApiController.post = function()
{
var self = this;
var cc = new couponHelper();
var limit = self.param('cid');
var offset = self.param('uid');
}
ApiController.delete = function()
{
var self = this;
  var cid = this.param('cid');
  var uid = this.param('uid');
  var couponH = new couponHelper();
  couponH.where({'_id':cid}).remove(function(e,r){
if(e)
{
      self.res.send({response:'error',message:e})
return;
}
    self.res.send({response:'success',message:r})



  })



}





module.exports = ApiController;
