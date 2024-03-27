const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dateOfBirth DATE NOT NULL,
    gender TEXT NOT NULL,
    address TEXT NOT NULL,
    telephone TEXT NOT NULL,
    email TEXT NOT NULL,
    course TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err.message);
    } else {
      console.log('Table students created or already exists.');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database', err.message);
  } else {
    console.log('Closed the database connection.');
  }
});