var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();
var SocketIOFileUploadServer = require('socketio-file-upload');
var md5 = require('MD5');
var fs = require('fs');
var Account = require('../models/account');
var express = require('express');
var sioCookieParser = express.cookieParser('cat');

PagesController.layout = function()
{
    this.render('pages/layout');
}

PagesController.index = function()
{
  this.title = 'Locomotive'

    console.log(this.req.user);
    console.log("========cokies-----------")
    var self = this;
    this.app.io.sockets.on('connection', function (socket) {
        var cookie_string = self.req.session;

        console.log('-------')
        console.log("WebSocket Connected");
            // Make an instance of SocketIOFileUploadServer and listen on this socket:
        var uploader = new SocketIOFileUploadServer();
        uploader.dir = "./server/coupons";
        uploader.mode = "0666"
        uploader.listen(socket);

        uploader.on("start", function(event){

            var old_name = event.file.name
            var arr = old_name.split('.');
            var new_name = md5(arr[0])+'.'+arr[arr.length - 1];

            return event.file.name = new_name;
        });

        uploader.on("saved", function(event){
            console.log("=============usaving ser==========")

            var user = cookie_string.passport.user;

            console.log(user);

            Account.findOne({email : user.email}, function(err, user) {
                if (err) { return next(err) }
                user.coupons.push({image : event.file.name});
                user.save(function(e){
                    console.log(e)
                    console.log('saved');
                });
            });
        });

        uploader.on("error", function(event){
            console.log("Error from uploader", event);
        });

    });

    this.render();

}



PagesController.before('*', function(next) {
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

module.exports = PagesController;