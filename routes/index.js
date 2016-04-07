var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var Event = mongoose.model('Event');
var Employee = mongoose.model('Employee');

var employees = require('../public/javascripts/employees_controller');
var employers = require('../public/javascripts/employers_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    console.log('logged in');
    res.render('test', { title: 'Shift Manager' });
  }
  else {     
    console.log('not logged in');
    res.render('index', { title: 'Shift Manager' });
}
});

router.get('/employeeView', function(req, res, next) {
  console.log('router.get /employeeView');
  res.render('employeeView', { title: 'Employee View' });
});

router.get('/employerView', function(req, res, next) {
  res.render('employerView', { title: 'Employer View' });
});

router.get('/employeeCalendar', function(req, res, next) {
  res.render('employeeCalendar', { title: 'Employee Calendar' });
});

router.get('/employerCalendar', function(req, res, next) {
  res.render('employerCalendar', { title: 'Employer Calendar' });
});

router.get('/events', function(req, res, next) {
   Event.find(function(err, events) {
       if(err) {
           return next(err);
       }
       res.json(events);
   });
});

router.post('/events', function(req, res, next) {
    var event = new Event(req.body);
    event.save(function(err, event) {
        if(err) {
            return next(err);
        }
        res.json(event);
    });
});

router.post('/login/employee', employees.login);
router.post('/login/employer', employers.login);
router.post('/register/employee', employees.signup);
router.post('/register/employer', employers.signup);

module.exports = router;
