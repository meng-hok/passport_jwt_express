var express = require('express');
var router = express.Router();

//Model
const Users = require('../models/Users');

router.get('/login', async (req, res, next) => 
{
    Users.getListUser(req.body, (results) => 
    {
        res.send(results);
    });
});

module.exports = router;