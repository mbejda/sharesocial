var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var Account = require('../../app/models/account');

// Use the LocalStrategy within Passport.


// Passport session setup.

passport.serializeUser(function(user, done) {
  console.log('serialize')
  done(null, user._id);

});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function (err, user) {
    done(err, user);
  });

});

passport.use(new FacebookStrategy({
    clientID: '417195511741678',
    clientSecret: '0f148ee79b2640adfb119dc4a0bfcd3c',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
  function(tok, tokenSecret, profile, done) {

console.log(profile)

var query = Account.findOne({ 'fbId': profile.id});
      query.exec(function (err, oldUser) {
        console.log(oldUser);
        if(oldUser) {
          console.log('User: ' + oldUser.name + ' found and logged in!');
          done(null, oldUser);
        } else {
          var newAccount = new Account();
          newAccount.fbId = profile.id;
          newAccount.name = profile.displayName;
          newAccount.email = profile.emails[0].value;
          newAccount.token = tok;
          newAccount.save(function(err) {
            if(err) {
              console.log(err)
return
            }

            console.log('New user: ' + newAccount.name + ' created and logged in!');
            done(null, newAccount);
          }); 
        }
      });



console.log("===================Inside Strategey===========================")
  }
));

