var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var PublisherSchema = new Schema({
  name: { type: String},
  token: { type: String},
  secretToken: { type: String}
});


var CouponSchema = new Schema({
  // eMail address
  store_name: { type: String },
  image_url : {type:String},
  store_address : {city:{type:String}, state:{type:String}, Zip:{type:Number}},
  store_contact : {email : {type:String},phone:{type:String}},
  image : {title: {type:String}}
});

var AccountSchema = new Schema({
  email: { type: Email },
  name: { type: String},
  token: { type: String },
  fbId: { type: String },
  coupons : [CouponSchema]

});



module.exports = mongoose.model('Account', AccountSchema);