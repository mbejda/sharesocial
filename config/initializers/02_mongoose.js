var winston = require('../../app/helper/logger');
var logger = winston.loggers.get('databaseLogger');

module.exports = function() 
{
var mongoose = require('mongoose');

logger.info('Stage Environment '+process.env.NODE_ENV)
  switch (process.env.NODE_ENV) {
    case 'development':
      mongoose.connect('mongodb://127.0.0.1:27017/sharesocial/accounts');

      break;
    case 'production':
      mongoose.connect('mongodb://appfog:079f40455c53f148cee689516ff7e638@alex.mongohq.com:10012/sharesocial_milo/sharesocial');
      break;
  };
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


