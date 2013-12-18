var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;
var Account = require('./account');
var CouponSchema = new Schema({
  start_date : {type:String},
  end_date : {type:String},
  promotion : {type:String},
  store_name: { type: String },
  link: { type: String },
  address : {type:String},
  image : {type:String}

});

CouponSchema.pre('remove', function (next) {

Account.update( { merchantCoupons: this._id }, { $pull: { merchantCoupons: this._id  }},{ $pull: { sharedCoupons: this._id  } },function(e,r){
console.log(e)
	next();
} )




  //next();
})



module.exports = mongoose.model('Coupons', CouponSchema);