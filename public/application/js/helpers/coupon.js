define(['knockout','jquery','./ajax'],function (ko,$,ajaxHelper) {

var couponObject = {
  test_data : ko.observable(),
  create : function(couponData)
  {
    var ajax = new ajaxHelper();
    return ajax.setData(couponData).setUrl('/coupon/create').go();

  },
  delete : function(couponId)
  {
var ajax = new ajaxHelper();
var ajaxObject = ajax.setData({cid:couponId}).setUrl('/coupon/delete').go();
ajaxObject.success = function(r)
{
  console.log(r)
}
},
  share : function(couponId)
  {
    var ajax = new ajaxHelper();
    return ajax.setType('post').setData({cid:couponId}).setUrl('/coupon/share').go();

  },
  get  : function(query)
  {
    var ajax = new ajaxHelper();

    return ajax.setType('get').setData(query).setUrl('/coupon/get').go();

  }
}
return couponObject;
})