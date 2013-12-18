function findBaseName(url) 
{
    var fileName = url.substring(url.lastIndexOf('/') + 1);
    var dot = fileName.lastIndexOf('.');
    return dot == -1 ? fileName : fileName.substring(0, dot);
}
function toJson(inputs)
{
      var o = {};
  var obj = $.map(inputs, function(n, i)
{
    o[n.name] = $(n).val();
});
  return o;
}







var app = {
  user : ko.observable({name:''}),
  coupons : new couponsModel(),
  images : ko.observableArray([]),
   test :function(elem) 
   { if (elem.nodeType === 1) {
    $(elem).hide().fadeIn() 
  }
},
     test2 :function(elem) 
   { if (elem.nodeType === 1) {
    $(elem).fadeOut();
  }
}


}

ko.applyBindings(app); 


$(document).ready(function(){
  if(window.userArray != undefined)
  {
app.user(userArray);
app.images(userArray.images)

}

$('.delete-coupon-image').on('click',function(){
var image = $(".thumbnail.selected .image_picker_image").attr('src');
$.post('image/delete',{data: {object:'image',value:image}},function(response){
  console.log(response.type)
  if(response.type === 'success')
  {
   var name =  image.split('/').pop()
   console.log(name)
  window.app.images.remove(name)
  console.log(window.app.images())
    var picker = $(".imagepicker").imagepicker({
    clicked : window.getImage
  })

}
})
})


$('.add-coupon').on('click',function(e){
  e.preventDefault();
var self = $(this).find('i')
  self.removeClass('fa-plus-circle');
  $(self).addClass('fa-refresh fa-spin')


  var arr = $(this).parents('.coupons-container').find('input,textarea');
var j = toJson(arr);
var ajaxObject = couponObject.create(j);
ajaxObject.always(function(){
  $(self).removeClass('fa-refresh fa-spin')

  $(self).addClass('fa-plus-circle')
return false;
  
})
ajaxObject.success(function(ret)
{
  app.coupons.createdCoupons.unshift(ret.object)
  $('.coupons .coupon').hover(function(){ $(this).find('img:first').animate({marginTop: '-10%'}, 50); }, function(){ $(this).find('img:first').animate({marginTop: '0'}, 150); });


});


});

function bindCoupons()
{
$('.coupons .coupon').hover(function(){ $(this).find('img:first').animate({marginTop: '-10%'}, 50); }, function(){ $(this).find('img:first').animate({marginTop: '0'}, 150); });

}

function loadCreatedCoupons()
{
var ajaxObject = couponObject.get({action:'loadCreatedCoupons'});
ajaxObject.success(function(ret)
{

app.coupons.createdCoupons(ret.results)
bindCoupons();

})
}
function loadAllCoupons()
{
var ajaxObject = couponObject.get({action:'loadAllCoupons'});
ajaxObject.success(function(ret)
{

app.coupons.allCoupons(ret.results)
bindCoupons();

})
}
function loadSharedCoupons()
{
var ajaxObject = couponObject.get({action:'loadSharedCoupons'});
ajaxObject.success(function(ret)
{
app.coupons.sharedCoupons(ret.results)
bindCoupons();

})
}



loadCreatedCoupons();
loadAllCoupons();
loadSharedCoupons();






  var getImage = function(d)
  {
    var data = $(this).val();
    $(".coupon-image").val(data);
    $(".temp-coupon-image").attr('src','coupons/'+data);
       

  }
  var picker = $(".imagepicker").imagepicker({
    clicked : getImage
  })
 $('.datepicker').datepicker()

$('.created-coupons').hide();
$(".show-created-coupons").on('click',function(){
  $('.created-coupons').slideToggle();
})
$('.all-coupons').hide();
$(".show-all-coupons").on('click',function(){
  $('.all-coupons').slideToggle();
})
$('.shared-coupons').hide();
$(".show-shared-coupons").on('click',function(){
  $('.shared-coupons').slideToggle();
})



  $('.coupons-container').hide();
$(".show-coupon-form").on('click',function(e){
  e.preventDefault();
  $('.coupons-container').slideToggle();
  return false;
})

})
