const database = require("../databases/dev.database");
const Pool = require("pg").Pool;
const pool = new Pool(database);

pool.connect(function (err) {
    if (err) throw err;
});

module.exports = pool;