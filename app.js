var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/jobshifts');
require('./models/models');

var routes = require('./routes/index');
var users = require('./routes/users');

var moment = require('moment');

//connect to the mongoDB
var db = require('mongoskin').db("localhost/testdb", { w: 0});
     db.bind('event');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge:2628000000},
  store: new mongoStore({
    mongooseConnection:mongoose.connection
  }),
  resave: true,
  saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// CALENDAR CONNECTION TO DATABASE
app.get('/init', function(req, res){
	db.event.insert({ 
		text:"My test event A", 
		start_date: new Date(2013,8,1),
		end_date:	new Date(2013,8,5)
	});
	db.event.insert({ 
		text:"My test event B", 
		start_date: new Date(2013,8,19),
		end_date:	new Date(2013,8,24)
	});
	db.event.insert({ 
		text:"Morning event", 
		start_date: new Date(2013,8,4,4,0),
		end_date:	new Date(2013,8,4,14,0)
	});
	db.event.insert({ 
		text:"One more test event", 
		start_date: new Date(2013,8,3),
		end_date:	new Date(2013,8,8),
		color: "#DD8616"
	});

	res.send("Test events were added to the database")
});


app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		
		//output response
		res.send(data);
	});
});


app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;

	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;

		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}

	if (mode == "updated")
		db.event.updateById( sid, data, update_response);
	else if (mode == "inserted")
		db.event.insert(data, update_response);
	else if (mode == "deleted")
		db.event.removeById( sid, update_response);
	else
		res.send("Not supported operation");
});

app.listen(3000);

module.exports = app;
