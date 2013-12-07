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
  name: { type: Email, unique: true },
  account_id

});





AccountSchema.method('checkPassword', function (password, callback) {
});


AccountSchema.static('authenticate', function (email, password, callback) {
  this.findOne({ email: email }, function(err, user) {
    if (err)
      return callback(err);

    if (!user)
      return callback(null, false);

    user.checkPassword(password, function(err, passwordCorrect) {
      if (err)
        return callback(err);

      if (!passwordCorrect)
        return callback(null, false);

      return callback(null, user);
    });
  });
});

module.exports = mongoose.model('Account', AccountSchema);