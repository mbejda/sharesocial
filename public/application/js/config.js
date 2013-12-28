require.config({
    "packages": ["models","helpers"],
    paths : {
      bootstrap : '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min',
      modals:'/vendors/bootstrap/js/bootstrap-modal',
    	jquery : '//cdn.jsdelivr.net/jquery/2.0.3/jquery-2.0.3.min',
    	knockout : '//cdn.jsdelivr.net/knockout/3.0.0beta/knockout',
    	imagepicker:'/vendors/image-picker/image-picker',
    	datepicker:'/vendors/datepicker/js/bootstrap-datepicker',
      qrcode:'/vendors/qrcode/js/jquery.qrcode',
      quickFlip:'/vendors/flip/js/jquery.quickflip.min'

    },
    shim: {
           'quickFlip': {
    deps: ['jquery'],
            exports: 'quickFlip'
      },
      'qrcode': {
    deps: ['jquery'],
            exports: 'qrcode'
      },
        'imagepicker': {
            deps: ['jquery'],
            exports: 'imagepicker'
        },
        'datepicker': {
            deps: ['jquery'],
            exports: 'datepicker'
        },
        'bootstrap': {
                 deps: ['jquery'],
            exports: 'bootstrap' 
        }
    }
});

require(["jquery","knockout","models","helpers","imagepicker","datepicker","bootstrap","qrcode","quickFlip"], function ($,ko,models,helpers,imagepicker,datepicker,bootstrap,qrcode,quickFlip) {



    // Initialize instances:
var couponObject = helpers.couponObject;
var ajaxObject = helpers.ajaxObject;




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

$(document).ready(function()
{

$(".launch-image-gallery").on('click',function(){
  $('#imageGallery').modal('toggle')
})


var app = {
  user : ko.observable({name:''}),
  coupons : new models.couponModel(),
   deleteCoupon : function(data,event)
   {
        var self = this;
 
self.e = event.target;

$.post('/api/delete',{cid:data['_id'], uid:window.userArray['_id']},function(r){
if(r.response == "success")
{
  $(self.e).parents('.coupon').fadeTo( "slow" , 0.5, function() {
  });
}

});
   },
  shareCoupon : function(data,event)
  {
    var self = this;
 
self.e = event.target;






var ajax = couponObject.share(data._id);
ajax.success(function(results){
 if(results.type == "success")
 {
      var coupon = $(self.e).parents('.coupon');
     coupon.find('img').fadeOut('slow',function(){
      $(this).remove();
     });
    $(self.e).parents('.coupon').find('.quickflip-wrapper').quickFlipper(); 
    $(coupon).find('.qrcode').qrcode({width: 240,height: 240,text:results.message});

 }

})

  },
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


$.get('/api/all',{},function(results)
{
  console.log('loaded')
  app.coupons.allCoupons(results.response);

})



function shipOff(event) {
    var result = event.target.result;
    var fileName = document.getElementById('fileBox').files[0];
     var formData = new FormData();
  formData.append("file", fileName);


$.ajax({
    url: '/upload', //server script to process data
    type: 'POST',
    success: function(result)
    {
if(result.type === "success")
{
console.log(result.image)
app.images.push(result.image);

}
$(".imagepicker").unbind('imagepicker')
  var picker = $(".imagepicker").imagepicker({
    clicked : (function(){
    var data = $(this).val();
    $(".coupon-image").val(data);
    $(".temp-coupon-image").attr('src','coupons/'+data);
    })
  })
    },
    data: formData,
    cache: false,
    contentType: false,
    processData: false
});





   // $.post('/myscript.php', { data: result, name: fileName }, continueSubmission);
}

     $("input:file").change(function (){
       var fileName = document.getElementById('fileBox').files[0];
       var reader = new FileReader();
reader.readAsText(fileName, 'UTF-8');
reader.onload = shipOff;
     });
 



  ko.applyBindings(app); 


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
  app.images.remove(name)
  console.log(app.images())
    var picker = $(".imagepicker").imagepicker({
    clicked : getImage
  })

}
})
})


$('.add-coupon').on('click',function(e){
  e.preventDefault();

  var arr = $(this).parents('.coupons-container').find('input,textarea');
var j = toJson(arr);
$.post('/api/create',{uid:window.userArray['_id'],data:j},function(response)
{
  console.log(response)
  if(response.type == "success")
  {
  app.coupons.createdCoupons.unshift(response.message)
  }
});
});



function bindCoupons()
{

}

function loadCreatedCoupons()
{
  var arr = $(this).parents('.coupons-container').find('input,textarea');
var j = toJson(arr);
$.get('/api/created',{uid:window.userArray['_id'],data:j},function(obj)
{
  console.log(obj.response.merchantCoupons)


  app.coupons.createdCoupons(obj.response.merchantCoupons)
  
});
}


function loadAllCoupons()
{
var ajaxObject = couponObject.get({action:'loadAllCoupons'});
ajaxObject.success(function(ret)
{

app.coupons.allCoupons(ret.results)

})
}
function loadSharedCoupons()
{
var ajaxObject = couponObject.get({action:'loadSharedCoupons'});
ajaxObject.success(function(ret)
{
app.coupons.sharedCoupons(ret.results)

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





})

  });

