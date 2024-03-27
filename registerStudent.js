const sqlite3 = require('sqlite3').verbose();

function registerStudent(studentData) {
  const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Error connecting to the database', err.message);
      return;
    }
    console.log('Connected to the SQLite database for student registration.');
  });

  // Adjusted to match the form's input name for date of birth
  const { name, dob: dateOfBirth, gender, address, telephone, email, course } = studentData;
  const sql = `INSERT INTO students (name, dateOfBirth, gender, address, telephone, email, course) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [name, dateOfBirth, gender, address, telephone, email, course], (err) => {
    if (err) {
      console.error('Error inserting data into the database', err.message);
    } else {
      console.log('Successfully inserted student data into the database');
    }
  });

  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection', err.message);
    } else {
      console.log('Closed the database connection after student registration.');
    }
  });
}

module.exports = { registerStudent };