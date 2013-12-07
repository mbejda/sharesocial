var FB = require('fb');
FB.options({ 'appSecret': '0f148ee79b2640adfb119dc4a0bfcd3c','appId' : '417195511741678'});
var user = '';

var FacebookModule = function(user)
{
	var self = this;
	self.accessToken 
	self.uid;
	self.coupondId;
	self.text;
	if(user)
	{
		self.setAccessToken(user.token);
		self.setUID(user.fbId);
	}

	self.setAccessToken = function(token)
	{
		 FB.setAccessToken(token);
		self.accessToken = token;
		return self;
	}
	self.setText = function(text)
	{
		self.text= text;
		return self;
	}
	self.setUID = function(uid)
	{
		self.uid = uid;
		return self;
	}
	self.postFeed = function()
	{

FB.api(self.uid+'/feed', 'post', { message: self.text}, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});


	}

	return {
		setAccessToken : self.setAccessToken,
		setText : self.setText;
		setUID : self.setUID,
		setCouponId: self.setCoupondId,
		postFeed : self.postFeed
	}
}
export.module = FacebookModule;