var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var Eventdb = mongoose.model('Event');
var Employee = mongoose.model('Employee');

var employees = require('../public/javascripts/employees_controller');
var employers = require('../public/javascripts/employers_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('router.get /');
  if (req.session.user) {
    console.log('logged in');
    res.sendFile('test.html', { title: 'Shift Manager', root: 'public' });
  }
  else {     
    console.log('not logged in');
    res.sendFile('index.html', { title: 'Shift Manager', root: 'public' });
  }
});

router.get('/employeeView', function(req, res, next) {
  console.log('router.get /employeeView');
  res.render('employeeView', { title: 'Employee View'});
});

router.get('/employerView', function(req, res, next) {
  //res.render('employerView', { title: 'Employer View' });
  res.sendFile('employerView.html', { title: 'Employer View', root: 'public' });
});

router.get('/employeeCalendar', function(req, res, next) {
  //res.render('employeeCalendar', { title: 'Employee Calendar' });
  res.sendFile('employeeCalendar.html', { title: 'Employee Calendar', root: 'public' });
});

router.get('/employerCalendar', function(req, res, next) {
  //res.render('employerCalendar', { title: 'Employer Calendar' });
  res.sendFile('employerView.html', { title: 'Employer Calendar', root: 'public' });
});

router.get('/events', function(req, res, next) {
   Eventdb.find(function(err, events) {
       if(err) {
           return next(err);
       }
       res.json(events);
   });
});

router.post('/events', function(req, res, next) {
//    console.log(req.body.start);
    var newEvent = new Eventdb({
        title: req.body.title,
        startDate: new Date(req.body.start),
        endDate: new Date(req.body.end)
    });
//    console.log("Created New Event");
    newEvent.save(function(err, post) {
        if(err) {
            console.log("Error creating event");
            return next(err);
        }
//        console.log(post);
        res.json(post);
    });
});

router.param('event', function(req, res, next, id) {
//    console.log(id);
  var query = Eventdb.findById(id);
  query.exec(function (err, event){
    if (err) { return next(err); }
    if (!event) { return next(new Error("can't find event")); }
//      console.log(event);
    req.event = event;
    return next();
  });
});

router.get('/events/:event', function(req, res) {
  res.json(req.event);
});

router.put('/events/:event/update', function(req, res, next) {
  req.event.update(function(err, event){
    if (err) { return next(err); }
      console.log(event);
    res.json(event);
  });
});


//router.put('events/:id/update', function(req, res, next) {
//    console.log("HERE");
//  var id = req.param.id,
//       body = req.body;
//  
//  Eventdb.findById(id, function(error, event) {
//    // Handle the error using the Express error middleware
//    if(error) return next(error);
//    
//    // Render not found error
//    if(!event) {
//      return res.status(404).json({
//        message: 'Event with id ' + id + ' can not be found.'
//      });
//    }
//    
//    // Update the event model
//    event.update(body, function(error, event) {
//      if(error) return next(error);
//      
//      res.json(event);
//    });
//  });
//});


router.post('/login/employee', employees.login);
router.post('/login/employer', employers.login);
router.post('/register/employee', employees.signup);
router.post('/register/employer', employers.signup);

module.exports = router;
