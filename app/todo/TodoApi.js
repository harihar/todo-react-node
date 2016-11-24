const express = require('express');
const router = express.Router();
const todoRepo = require('./TodoRepo');

router.get('/todo', (req, res, next) => {
    todoRepo.findAll()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/todo', (req, res, next) => {
    const todo = req.body;
    todoRepo.save(todo)
        .then((result) => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;