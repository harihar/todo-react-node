const express = require('express');
const router = express.Router();
const todoRepo = require('./TodoRepo');

//A test url to check if database connectivity is established
router.get('/todo/test', (req, res, next) => {
   todoRepo.test()
       .then((result) => {
           res.send(result);
       })
       .catch((err) => {
           next(err);
       });
});

router.get('/todo', function(req, res, next) {
    todoRepo.findAll()
        .then((result) => {
            const todoDTO = result.map(todo => mapToDTO(todo));
            res.json(todoDTO);
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

router.patch('/todo', (req, res, next) => {
    const inputTodo = mapToModel(req.body);
    todoRepo.update(inputTodo)
        .then((result) => {
            res.json(mapToDTO(result));
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/todo/:itemId', (req, res, next) => {
    todoRepo.deleteTodo(req.params.itemId)
        .then(() => {
            // console.log(`${result} no of rows deleted`);
            res.json({id: req.params.itemId});
        })
});

router.post('/todo/clear_completed', (req, res, next) => {
    todoRepo.deleteCompletedOnes(req.params.itemId)
        .then((result) => {
            const idList = result.map(item => item.id);
            console.log(`deleted ${idList}`);
            res.json({idList});
        })
});

const mapToDTO = todo => {
    return {id: todo.id, title: todo.title, isCompleted: todo.is_done};
};

const mapToModel = todo => {
    return {id: todo.id, title: todo.title, is_done: todo.isCompleted};
};

module.exports = router;