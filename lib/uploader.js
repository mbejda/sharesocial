  var SocketIOFileUploadServer = require('socketio-file-upload');
var md5 = require('MD5');

module.exports = (function(cb){
    var uploader = new SocketIOFileUploadServer();
  uploader.dir = "./server/coupons";
    uploader.mode = "0666"
    uploader.listen(3002);

    uploader.on("start", function(event){
       console.log(self.locals);

       console.log(self.res);
console.log("locals-------")
        var old_name = event.file.name
        var arr = old_name.split('.');
        console.log(arr)
        var new_name = md5(arr[0])+'.'+arr[arr.length - 1];

        return event.file.name = new_name;

    }); 

       uploader.on("saved", function(event){
        console.log(event.file);
        cb();
    });
  uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
})
