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
    let sql = "INSERT INTO tbl_user VALUES($1, $2, $3, $4)";
    db.query(sql, [params.id, params.email, params.password, params.status], (error, results) =>
    {
        if(error)
            res.send({"error":error});
        else
            res.send(results)    
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