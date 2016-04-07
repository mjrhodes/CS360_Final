var crypto = require('crypto');
var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.signup = function(req, res){
  console.log("Begin exports.signup");
  console.log("req: " + req.body);
  var employee = new Employee({employerID: req.body.employerID, username:req.body.username});
  console.log("after new employer exports.signup");
  employee.set('hashed_password', hashPW(req.body.password));
  console.log("after hashing employer exports.signup");
  employee.save(function(err) {
    console.log("In exports.signup");
    if (err){
      console.log('got error');
      res.session.error = err;
      res.redirect('/');
    } else {
      req.session.user = employee.id;
      req.session.username = employee.username;
      console.log('redirecting');
      res.redirect('/');
    }
  });
};
exports.login = function(req, res){
  Employee.findOne({ username: req.body.username })
  .exec(function(err, employee) {
    if (!employee){
      err = 'Employee Not Found.';
    } else if (employee.hashed_password === 
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        console.log("login");
        console.log(employee);
        req.session.user = employee.id;
        req.session.username = employee.username;
      });
    }else{
      err = 'Authentication failed.';
    }
    if(err){
      req.session.regenerate(function(){
      });
    }
  });
};
