const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  Student_id:       { type: Number, unique: true },
  Student_name:     { type: String },
  student_mobile:   { type: String },
  student_email:    { type: String },
  student_password: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('student', StudentSchema);