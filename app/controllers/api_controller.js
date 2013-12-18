var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var ApiController = new Controller();
var Account = require('../models/account');
var couponHelper = require('../helper/couponHelper');


ApiController.index = function()
{
	var self = this;
	var uid = this.param('uid');
	var limit = this.param('limit');
	var offset = this.param('offset');
//	var fid = this.param('fid');
var cc = new couponHelper();
cc.limit(10).where({uid: uid}).limit(limit).offset(offset).find(function(e,u){
self.res.send(JSON.stringify(u))
});



}

module.exports = ApiController;
