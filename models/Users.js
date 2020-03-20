const db = require('../configs/connection');

exports.getListUser = (req, res) =>
{
    let sql = "SELECT * FROM tbl_user";
    db.query(sql, [], (error, {rowCount, rows}) =>
    {
        res.send({rows, rowCount});
    });
};

exports.getUserById = (id, callbackFn) =>
{
    let sql = "SELECT * FROM tbl_user where user_id = $1";
    db.query(sql, [id], (error, {rowCount, rows}) =>
    {
        return callbackFn({rows, rowCount});
    });
};

exports.signUpUser = (params, res) =>
{
    let sql = "UPDATE tbl_user SET last_nm = $1, status = $2 WHERE user_id = $3";
    db.query(sql, [params.last_nm, params.status, params.id], (error, results) =>
    {
        res.send({"error":false});
    });
};

exports.deleteUserById = (id, res) => 
{
    let sql = "UPDATE tbl_user SET status = '9' WHERE user_id = $1";
    db.query(sql, [id], (error, results) => 
    {
        res.send({"error":false});
    });
};