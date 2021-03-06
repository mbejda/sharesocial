var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var CouponsController = new Controller();
var Account = require('../models/account');
var passport = require('passport');
var FB = require('../helper/facebookHelper');
var couponHelper = require('../helper/couponHelper');
var userHelper = require('../helper/userHelper');
var couponModel = require('../models/coupon');

var _ = function(v)
{
	console.log('====================')
		console.log(v)
		console.log('====================')

}
CouponsController.view = function() {
  var self = this;
var cid = this.param('id');
var couponH = new couponHelper();
couponH.where({'_id': cid}).findOne(function(e,r){
self.coupon = r;
self.render();

})
}
CouponsController.share = function() {
  var self = this;
  var data = this.param('data');
  var user = this.req.user;
  var FBHelper = new FB(user);
  var couponH = new couponHelper();


  couponModel.findOne({'_id': data.cid},function(e,r){
    console.log(e)
    console.log(r)
    if(e)
    {
      console.log(e)
self.res.send({type:'error',message:e})
return;
    }

var message = r.link || r.promotion;
  FBHelper.setText(message).postFeed(function(e,r){
    if(e)
    {
self.res.send({type:'error',message:e})
return;
    }
    var user = self.user.model();
    user.sharedCoupons.push(data.cid);
  user.save(function(e)
    {
console.log(e)
self.res.send({type:'success',message:message})

    });





  })
})
}

CouponsController.index = function() {
	
  this.title = 'Account'
  this.render();
}
CouponsController.new = function() {
	
  this.title = 'Account'
  this.render();
}
CouponsController.post = function() {
  /*var user = this.req.user;
  var FBUser = new FB(user);
 // FBUser.setText('test')
  //FBUser.postFeed();
var couponHelper = new CouponHelper();
couponHelper.set('store_name','test').createCoupon(function(r){


})
*/

var self = this;
console.log(self.user.model());
this.redirect('/');
}

CouponsController.create = function() 
{

}
CouponsController.get = function() {
  var self = this;
  var merchantCoupons = self.req.user.merchantCoupons;
  var sharedCoupons = self.req.user.sharedCoupons;


  var data = this.param('data');
  var action = data.action;
  if(action == 'loadCreatedCoupons')
  {
  var couponH = new couponHelper();
  couponH.loadUserCoupons(merchantCoupons,function(err,res){
console.log(err)
  self.res.send({results:res})
  })
}
  if(action == 'loadSharedCoupons')
  {
    console.log('SHARED')
    console.log(sharedCoupons)
  var couponH = new couponHelper();
  couponH.loadSharedCoupons(sharedCoupons,function(err,res){
    console.log(err)
  self.res.send({results:res})
  })
}
  if(action == 'loadAllCoupons')
  {
  var couponH = new couponHelper();
  couponH.limit(100).loadAllCoupons(function(err,res){
console.log(err)
  self.res.send({results:res})
  })
}



}


CouponsController.show = function() {
	
  this.title = 'Account'
  this.render();
}
CouponsController.edit = function() {
	
  this.title = 'Account'
  this.render();
}
CouponsController.update = function() {
	
  this.title = 'Account'
  this.render();
}

CouponsController.before('*', function(next) {
  var self = this;
  var u = self.req.user;
  self.user = new userHelper(u, function(){
    next();
  });

});




module.exports = CouponsController;
