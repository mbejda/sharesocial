
var mongoose = require('mongoose');
mongoose.connect('mongodb://appfog:079f40455c53f148cee689516ff7e638@alex.mongohq.com:10012/sharesocial_milo/sharesocial');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

mongoose.connection.on("open", function(ref) {
  return console.log("Connected to mongo server!"+ref);
});

mongoose.connection.on("error", function(err) {
	console.log(err)
  console.log("Could not connect to mongo server!");
});
