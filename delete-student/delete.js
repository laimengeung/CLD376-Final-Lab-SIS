const express = require('express');
const mongoose = require('mongoose');
const Student = require('./student_schema');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Delete service connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.delete('/delete/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Student_id must be a number' });
  try {
    const removed = await Student.findOneAndDelete({ Student_id: id });
    if (!removed) return res.status(404).json({ error: 'No student found with id ' + id });
    res.json(
        { message: 'Student deleted successfully', Student_id: removed.Student_id, Student_name: removed.Student_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5002, () => console.log('Delete Student service running on port 5002'));
