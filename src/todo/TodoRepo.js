const db = require('../db-config');

function test() {
    return db.one("select 1+1");
}
function findAll() {
    return db.any("select * from todos");
}

function save(todo) {
    return db.one("insert into todos(title) values(${title}) returning *", {title: todo.title});
}

function findById(id) {
    return db.one("select * from todos where id=$1", [id]);
}

function update(todo) {
    return db.one("update todos set title=${title}, is_done=${is_done} where id=${id} returning *", todo);
}

function deleteTodo(itemId) {
    return db.none("delete from todos where id=$1", itemId);
}

function deleteCompletedOnes() {
    return db.any("delete from todos where is_done=true returning id");
}

module.exports = {findAll, save, findById, update, deleteTodo, deleteCompletedOnes, test};