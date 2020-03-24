const router = require('express').Router();
const redis = require("redis");
const client =redis.createClient();
var session = require("express-session")
const {v4 : uuid} = require('uuid')

// Login
router.get("/",(req,res) => {
   
    console.log(req.session)
    client.get("heymenghok",(error,reply) => {
        console.log(`im result`)
        error ? console.log(error) : console.log(reply)
        console.log(req.headers)
        // console.log(session.view)
        res.send(reply)
    })
   
})

router.get('/get',(req,res)=> {
    req.session.sid = uuid();
     res.redirect('/redis');

     
})

module.exports = router;