// load packages
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// initialize express and dotenv
const app = express();
dotenv.config();

// configure the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// test connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting tot the database', err);
        return;
    } else {
        console.log('Connected to the database');
    }
});

app.use(express.json());

// Question 1
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving patients', err);
            res.status(500).send('Something went wrong');
        } else {
            res.json(results);
        }
    });
});

// Question 2
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving providers', err);
            res.status(500).send('Something went wrong');
        } else {
            res.json(results);
        }
    });
});

// Question 3
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
        if (err) {
            console.error('Error retrieving patient by first name', err);
            res.status(500).send('Something went wrong');
        } else {
            res.json(results);
        }
    });
});

// Question 4
app.get('/providers/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error('Error retrieving providers by specialty', err);
            res.status(500).send('Something went wrong');
        } else {
            res.json(results);
        }
    });
});

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});