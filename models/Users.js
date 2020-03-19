const db = require('../configs/connection');

exports.getListUser = (req, callbackFn) =>
{
    db.query('SELECT * FROM tbl_user where status = $1', [req.status], (error, {rowCount, rows}) =>
    {
        return callbackFn({rows, rowCount});
    });
};