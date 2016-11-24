const express = require('express');
const app = express();
const db = require('./db-config');
const todoApi = require('./todo/TodoApi');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(todoApi);

app.get("/", (req, res) => {
    res.json({"status": "UP"});
});

app.get("/test", (req, res, next) => {
    db.any('SELECT * from users')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});

app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send('Something broke!' + err.message)
});

const listener = app.listen(9090, (err, res) => {
    if (err) {
        console.log('Error while starting server');
    }
    console.log('Listening on ' + listener.address().port);
});