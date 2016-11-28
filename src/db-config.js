const pgp = require('pg-promise')();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://junabazaar-master:password@localhost:5432/junabazaar-master';
const db = pgp(DATABASE_URL);

module.exports = db;