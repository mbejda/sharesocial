var locomotive = require('locomotive')
    , Controller = locomotive.Controller;

var PagesController = new Controller();


var md5 = require('MD5');
var fs = require('fs');
var Account = require('../models/account');
var express = require('express');
var sioCookieParser = express.cookieParser('cat');
var couponHelper = require('../helper/couponHelper');
var Async = require('async');
var couponModel = require('../models/coupon');
var fs = require('fs');
var path = require('path');

function loadCreatedCoupons(array,callback)
{
    couponModel.find({
        '_id': {
            $in:array
        }
    }, function(e,r){
        callback(e,r)
    })

}
PagesController.delete = function() {
    var self= this;
    var data = this.param('data');
    var p = data.value;
    var name = path.basename(p);
    Account.update({'_id':this.req.user._id},{ $pull: { images: name  } }, function(e,r){

        if(fs.existsSync('./public/'+p))
        {
            console.log('delete')
            fs.unlinkSync('./public/'+p)
        }

        console.log(e)
        console.log(r)
        self.res.send({type:'success',message:'File deleted'})
    })








}
PagesController.upload = function() {
    var self = this;
    var root = this.req.files;
    var safeName;
    var tmp_path = root.file.path;
    var nameArray = root.file.originalFilename.split('.');
    safeName = md5(nameArray[0])+'.'+nameArray[1];
    var target_path = './public/coupons/' + safeName;
    if(fs.existsSync(target_path))
    {
        fs.unlinkSync(target_path)
    }
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
            if (err) throw err;

        });



        Account.update({'_id': self.req.user._id},{$addToSet: {images:safeName}},function(err,results){
            if(err){
                console.log(err);
            }else{

                console.log(results)
                self.res.send({type:'success',image:safeName});


            }
        });




    });



}
PagesController.sharedCoupons = function() {




}
PagesController.allCoupons = function() {




}
PagesController.main = function() {
    if(!this.req.user)
    {

        this.render();
        return;

    }
    var uid = this.req.user._id;
    var self = this;



    self.coupons = [];
    if(self.req.user)
    {
        var user = self.req.user;
        self.user = user;

        Async.series([
            loadCreatedCoupons.bind(this,self.user.merchantCoupons),

        ], function(e,r){
            self.merchantCoupons = r;
            self.render();

        })
    }



}




module.exports = PagesController;
