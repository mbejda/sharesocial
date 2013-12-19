var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PublicController = new Controller();
var SocketIOFileUploadServer = require('socketio-file-upload');
var md5 = require('MD5');
var fs = require('fs');
var Account = require('../models/account');
var express = require('express');
var sioCookieParser = express.cookieParser('cat');

PublicController.layout = function()
{
    this.render('pages/layout');
}

PublicController.index = function()
{
  this.title = 'Locomotive'

    console.log(this.req.user);
    console.log("========cokies-----------")
    var self = this;



    this.render();

}



PublicController.before('*', function(next) {
  var self = this;
  var u = self.req.user;
    if(u != undefined && u.email != undefined){
        Account.findOne({email : u.email}, function(err, user) {
            if (err) { return next(err) }
            self.u = user;
            next();
        });
    }else{
        next();
    }
});

module.exports = PublicController;