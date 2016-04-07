var crypto = require('crypto');
var mongoose = require('mongoose'),
    Employer = mongoose.model('Employer');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.signup = function(req, res){
  console.log("Begin exports.signup");
  var employer = new Employer({username:req.body.username});
  console.log("after new employer exports.signup");
  employer.set('hashed_password', hashPW(req.body.password));
  console.log("after hashing employer exports.signup");
  employer.save(function(err) {
    console.log("In exports.signup");
    console.log(err);
    if (err){
      res.session.error = err;
      res.redirect('/');
    } else {
      req.session.user = employer.id;
      req.session.username = employer.username;
      res.redirect('/');
    }
  });
};
exports.login = function(req, res){
  Employer.findOne({ username: req.body.username })
  .exec(function(err, employer) {
    if (!employer){
      err = 'Employer Not Found.';
    } else if (employer.hashed_password === 
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        console.log("login");
        console.log(employer);
        req.session.user = employer.id;
        req.session.username = employer.username;
        res.redirect('/');
      });
    }else{
      err = 'Authentication failed.';
    }
    if(err){
      req.session.regenerate(function(){
        res.redirect('/');
      });
    }
  });
};
