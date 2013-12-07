var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var CouponsController = new Controller();
var Account = require('../models/account');
var passport = require('passport');
var FB = require('../helper/facebokHelper');


var _ = function(v)
{
	console.log('====================')
		console.log(v)
		console.log('====================')

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
  var user = this.req.user;
  var FBUser = new FB(user);
  FBUser.setText('test')
  FBUser.postFeed();







this.redirect('/');
}

CouponsController.create = function() {
	var self = this;
self.u.coupons.push({store_name:'STORE NAME'})
self.u.save(function(e){
	console.log(e)
	console.log("SAVED COUPON")
self.redirect('/account');
})

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
CouponsController.delete = function() {
	var id = this.param('id')
		console.log("coupon id =============")
var self = this;
	console.log(id)
	Account.findOne({'email':self.u.email},function(e,doc){


    for(var i=0; i<=doc.coupons.length; i++){
        if (doc.coupons[i]._id == id){
        	console.log("FOUNDDDDDDD")
            doc.coupons.splice(i,1);
            break;                          
        }
    }
 doc.save(function(e){
 	console.log('saved')
 })

	})


	console.log("coupon id =============")
  this.title = 'Account'
  this.redirect('/account');
}
CouponsController.before('*', function(next) {
  var self = this;
  var u = self.req.user;
  Account.findOne({email : u.email}, function(err, user) {
    if (err) { return next(err) }
    self.u = user;
    next();
  });
});




module.exports = CouponsController;
