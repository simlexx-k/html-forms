const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerStudent } = require('./registerStudent');

const app = express();
const port = process.env.PORT || 3000; // INPUT_REQUIRED {Specify the PORT number if different from 3000}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.post('/register', (req, res) => {
  try {
    console.log('Attempting to register student with data:', req.body);
    registerStudent(req.body);
    console.log('Student registration successful with data:', req.body);
    res.status(200).json({ message: 'Student registration successful.' });
  } catch (error) {
    console.error('Error during student registration:', error.message, error.stack);
    res.status(500).json({ message: 'Error during student registration.', error: error.message });
  }
});

app.get('/admin', (req, res) => {
  // Placeholder for admin dashboard route
  console.log('Accessing the admin dashboard');
  res.status(200).send('Admin dashboard will be implemented here.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});