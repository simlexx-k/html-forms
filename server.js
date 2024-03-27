const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { registerStudent } = require('./registerStudent');

const app = express();
const port = process.env.PORT || 3000;

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
  console.log('Accessing the admin dashboard');
  res.status(200).send('Admin dashboard will be implemented here.');
});

app.get('/api/students', (req, res) => {
  const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('Error connecting to the database', err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Connected to the SQLite database for fetching students.');
  });

  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) {
      console.error('Error fetching students', err.message, err.stack);
      res.status(500).json({ error: 'Failed to retrieve students' });
    } else {
      console.log('Successfully fetched student data from the database');
      res.status(200).json(rows);
    }
    db.close((err) => {
      if (err) {
        console.error('Error closing the database connection', err.message, err.stack);
      } else {
        console.log('Closed the database connection after fetching students.');
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});