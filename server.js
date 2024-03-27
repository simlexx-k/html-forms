const express = require('express');
const cors = require('cors');
const { registerStudent } = require('./registerStudent');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
  try {
    registerStudent(req.body);
    console.log('Attempting to register student with data:', req.body);
    res.status(200).json({ message: 'Student registration successful.' });
  } catch (error) {
    console.error('Error during student registration:', error.message, error.stack);
    res.status(500).json({ message: 'Error during student registration.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});