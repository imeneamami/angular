const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const server = express();
server.use(bodyParser.json());

// Establish the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user',
});

db.connect(function (error) {
  if (error) {
    console.log('Error Connecting to DB');
  } else {
    console.log('Successfully Connected to DB');
  }
});

// Create the Records
server.post('/api/user/add', (req, res) => {
    let details = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    let sql = 'INSERT INTO user SET ?';
    db.query(sql, details, (error) => {
      if (error) {
        res.status(500).json({ status: false, message: 'User creation failed' });
      } else {
        res.status(200).json({ status: true, message: 'User created successfully' });
      }
    });
  });


// Update the Records
server.put('/api/student/update/:id', (req, res) => {
  let sql =
    'UPDATE student SET stname=?, course=?, fee=? WHERE id=?';
  let values = [
    req.body.stname,
    req.body.course,
    req.body.fee,
    req.params.id,
  ];

  db.query(sql, values, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Student update failed' });
    } else {
      res.send({ status: true, message: 'Student updated successfully' });
    }
  });
});

// Delete the Records
server.delete('/api/student/delete/:id', (req, res) => {
  let sql = 'DELETE FROM student WHERE id=?';
  let value = req.params.id;
  db.query(sql, value, (error) => {
    if (error) {
      res.send({ status: false, message: 'Student deletion failed' });
    } else {
      res.send({ status: true, message: 'Student deleted successfully' });
    }
  });
});

const port = 90;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});