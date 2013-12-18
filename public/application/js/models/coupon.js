define(['jquery','knockout','../helpers/coupon'],function ($,ko,couponObject) {
var couponsModel = function(){
  var self = this;
  self.sharedCoupons = ko.observableArray([]);
  self.allCoupons = ko.observableArray([]);
  self.createdCoupons = ko.observableArray([]);
  self.like = function()
  {

  }
  self.view = function()
  {
    
  var win=window.open('/coupon/view/'+this._id, '_blank');
  }
  self.share = function()
  {
    var obj = this;
    var cid = obj['_id'];
    console.log(cid)
    var ajaxObject = couponObject.share(cid);
    ajaxObject.success(function(r)
    {
      console.log('Shared!')
      console.log(r)
    })
  }
  self.delete = function()
  {
    var obj = this;
    var cid = obj['_id'];
    couponObject.delete(cid);

    self.createdCoupons.remove(this);

  };
}

return couponsModel;
})