require.config({
    "packages": ["models","helpers"],
    paths : {
      bootstrap : '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min',
    	jquery : '//cdn.jsdelivr.net/jquery/2.0.3/jquery-2.0.3.min',
    	knockout : '//cdn.jsdelivr.net/knockout/3.0.0beta/knockout',
    	imagepicker:'/vendors/image-picker/image-picker',
    	datepicker:'/vendors/datepicker/js/bootstrap-datepicker'

    },
    shim: {
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

require(["jquery","knockout","models","helpers","imagepicker","datepicker","bootstrap"], function ($,ko,models,helpers,imagepicker,datepicker,bootstrap) {



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

$(document).ready(function(){

var app = {
  user : ko.observable({name:''}),
  coupons : new models.couponModel(),
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

  });

