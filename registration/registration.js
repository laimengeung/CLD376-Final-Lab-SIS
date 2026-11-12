const express = require('express');
const mongoose = require('mongoose');
const Student = require('./student_schema');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Registration connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.post('/register', async (req, res) => {
  const { Student_name, student_mobile, student_email, student_password } = req.body || {};
  if (!Student_name || !student_mobile || !student_email || !student_password) {
    return res.status(400).json(
        { error: 'Student_name, student_mobile, student_email and student_password are required' });
  }
  try {
    const student = await Student.create({
      Student_id: Math.floor(1000 + Math.random() * 9000),
      Student_name, student_mobile, student_email, student_password
    });
    res.status(201).json({ message: 'Student registered successfully', Student_id: student.Student_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => console.log('Registration service running on port 5001'));
