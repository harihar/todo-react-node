const express = require('express');
const app = express();
const todoApi = require('./todo/TodoApi');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname + '/../web-app/dist/')));
app.use(bodyParser.json());

//register the TODO_Apis
app.use(todoApi);

//A Health check endpoint
app.get("/health", (req, res) => {
    res.json({"status": "UP"});
});

//Generic error handler
app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500)
        .json({
            status: "Error",
            message: err.message
        });
});

const port = process.env.PORT || 9095;

const listener = app.listen(port, (err, res) => {
    if (err) {
        console.log('Error while starting server');
    }
    console.log('Listening on http://localhost:' + listener.address().port);
});