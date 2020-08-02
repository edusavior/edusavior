const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  studentName : {type:String,require:true},
  instructorName : {type:String,require:true},  
  notes : {type:String,require:true},  
  date : {type:String,require:true},
});

module.exports = mongoose.model('Appointment',AppointmentSchema);

