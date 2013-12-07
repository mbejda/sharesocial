var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var CouponSchema = new Schema({
  // eMail address
  start_date : {type:String},
  end_date : {type:String},
  promote : {type:String},
  store_name: { type: String },
  image_url : {type:String},
  store_address : {city:{type:String}, state:{type:String}, Zip:{type:Number}},
  store_contact : {email : {type:String},phone:{type:String}},
  image :  {type:String},
  creator_id : {type:String}

});


module.exports = mongoose.model('Coupons', CouponSchema);