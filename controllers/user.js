var express = require('express');
var router = express.Router();

//Model
const Users = require('../models/Users');

//Get all users
router.get('/users', async (req, res, next) => 
{
    Users.getListUser(req.body, res);
});

//Get specific user
router.get('/users/:id', async (req, res, next) => 
{
    Users.getUserById(req.params.id, (results) => 
    {
        res.send(results);
    });
});

//Update specific user
router.post('/users/signup', async (req, res, next) =>
{
    Users.signUpUser(req.body, res);
});

router.put('/users/delete/:id', async (req, res, next) =>
{
    Users.deleteUserById(req.params.id, res);
});

module.exports = router;