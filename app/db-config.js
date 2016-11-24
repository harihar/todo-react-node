const pgp = require('pg-promise')();

var db = pgp('postgres://junabazaar-master:password@localhost:5432/junabazaar-master');

module.exports = db;