
if(process.env.VCAP_SERVICES){
var env = JSON.parse(process.env.VCAP_SERVICES);
var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
var mongo = {
"hostname":"localhost",
"port":27017,
"username":"",
"password":"",
"name":"",
"db":"db"
}
}
var generate_mongo_url = function(obj){
obj.hostname = (obj.hostname || 'localhost');
obj.port = (obj.port || 27017);
obj.db = (obj.db || 'test');
if(obj.username && obj.password){
return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
}
else{
return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
}
}
var mongourl = generate_mongo_url(mongo);



var mongoose = require('mongoose');
mongoose.connect(mongourl+'/sharesocial');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose);

mongoose.connection.on("open", function(ref) {
  return console.log("Connected to mongo server!"+ref);
});

mongoose.connection.on("error", function(err) {
	console.log(err)
  console.log("Could not connect to mongo server!");
});
