var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sharesocial');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

mongoose.connection.on("open", function(ref) {
  return console.log("Connected to mongo server!"+ref);
});

mongoose.connection.on("error", function(err) {
	console.log(err)
  console.log("Could not connect to mongo server!");
});
