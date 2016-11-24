const db = require('../db-config');

function findAll() {
    return db.any("select * from todos");
}

function save(todo) {
    return db.one("insert into todos(title) values(${title}) returning *", {title: todo.title});
}

module.exports = {findAll, save};