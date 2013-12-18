var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var AccountSchema = new Schema({
    account:    { type: String},
    email:      { type: Email },
    name:       { type: String},
    token:      { type: String }, //fb token
    fbId:       { type: String },
    company : {
        name :       { type: String },
        address : {
            full : { type: String },
            address_1 : { type: String },
            address_2 :{ type: String },
            city : { type: String },
            state : { type: String },
            country : { type: String },
            postalCode : { type: Number }
        },
        phone: { type: Number },
        fax :  { type: Number }
    },
    sharedCoupons : [{ type: Schema.Types.ObjectId, ref: 'Coupons' }],
    merchantCoupons : [{ type: Schema.Types.ObjectId, ref: 'Coupons' }],
    follow:[],
    images : []
});

module.exports = mongoose.model('Account', AccountSchema);