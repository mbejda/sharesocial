// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('passport');

module.exports = function routes() {
  this.root('public#index');

   this.match('layout','pages#layout');

    this.match('coupon/post', 'coupons#post', { via: 'get' });

  this.match('coupons/create', 'coupons#create', { via: 'post' });
  this.match('coupons/:id/delete', 'coupons#delete', { via: ['get','post','put'] });



  this.match('register', 'account#register', { via: 'post' });
  this.match('account', 'account#index');

  this.match('logout', 'account#logout');



this.match('login',   passport.authenticate('facebook', {  scope: ['publish_actions','publish_stream','email','user_status', 'user_checkins'] }));
this.match('auth/facebook/callback',   passport.authenticate('facebook', {  scope: ['publish_actions','publish_stream','email','user_status', 'user_checkins'],successRedirect:'/' }));


};


