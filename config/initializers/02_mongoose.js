module.exports = function() 
{
var mongoose = require('mongoose');

      mongoose.connect('mongodb://127.0.0.1:27017/sharesocial/accounts');


  var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

mongoose.connection.on("open", function(ref) {
  return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function(err) {
	console.log(err)
	logger.error(err)
  console.log("Could not connect to mongo server!");
});
}


