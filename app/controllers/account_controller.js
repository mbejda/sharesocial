var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var AccountController = new Controller();
var Account = require('../models/account');
var passport = require('passport');
var Facebook = require('facebook-node-sdk');
var appid = '417195511741678';
var secret = '';
var FB = require('fb');
FB.options({ 'appSecret': '0f148ee79b2640adfb119dc4a0bfcd3c','appId' : '417195511741678'});
var md5 = require('MD5');



var _ = function(v)
{
	console.log('====================')
		console.log(v)
		console.log('====================')

}
AccountController.main = function() {
	var self = this;
	
  this.title = 'Account'










this.render();



}
AccountController.index = function() {
	/*
_("login")
var self = this;
var facebook_secret = '';
console.log(this.req.user)


 this.req.logIn(this.req.user, function(err) {

    console.log('cookie set')
    });



for(var x = 0; x < self.u.publishers.length;  x++)
{
	var pname = 	self.u.publishers[x].name;
	var token = 	self.u.publishers[x].token;
	if(pname == "facebook.com" && token != "")
	{
facebook_secret = token;


FB.setAccessToken(facebook_secret);




	}

}*/
/*
var body = 'My first post using facebook-node-sdk';
FB.api('me/share_social:share', 'post', { coupon: 'http://samples.ogp.me/417264695068093'}, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});


*/

 // this.title = 'index'

  this.render('pages/index');
}
AccountController.login = function()
{

}

AccountController.facebook = function()
{
  this.title = 'index'
console.log('facebook')
  this.render('pages/index');

}




AccountController.register = function()
{
	var self = this;
	_(this.param('password'))
	_(this.param('email'))
	var account = new Account();
	account.email = this.param('email')
	account.password = this.param('password')
	account.save(function(e){
		if(e)
		{
			_(e);
		}else{
			_("account created")
			self.urlFor({action:'login'})
		}
	})



}



module.exports = AccountController;
