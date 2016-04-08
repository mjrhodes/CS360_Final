var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
//    numOfEmployees: Number
});
//EventSchema.methods.save = function(cb) {
//    this.save(function(err) {
//        if(err) throw err;
//    });
//};
EventSchema.methods.update = function(cb) {
    console.log(cb);
  this.save(cb);
};
var EmployeeSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    hashed_password: String,
    employerID: String
});
var EmployerSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    hashed_password: String,
    employerID: String
});
mongoose.model('Event', EventSchema);
mongoose.model('Employee', EmployeeSchema);
mongoose.model('Employer', EmployerSchema);
