var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const colors = require('colors');
var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'database'
});
  
// connect to database
dbConn.connect(); 
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Welcome to the API v1.0.0' })
});
 
 
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List of users in database.' });
    });
});
 
 
// Retrieve user with id 
app.get('/user/:id', function (req, res) {  
    let user_id = req.params.id;  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'User Data' });
    });
  
});
  
// insert new observation
app.post('/insert/:user_id/:doctor_id', function (req, res){
    let user_id = req.params.user_id;
    let doctor_id = req.params.doctor_id;
    var data = {
        "data": {
            "user": user_id,
            "doctor": doctor_id
        }
    }; 

    send.json(data);
});

 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;
