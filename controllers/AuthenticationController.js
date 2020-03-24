// const User = require('../models/Users');
const router = require('express').Router();
const passport = require('../configs/authentication_token').passport;
const jwt = require('jsonwebtoken');
const db = require('../configs/connection');
const redis = require("redis");
const client =redis.createClient();
var session = require("express-session")
const {v4 : uuid} = require('uuid')
/**
 *  In order to get token
 * {
 *  "email" : 
 *   "password"
 * }
 * 
 */
router.post('/getToken', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send('no fields');
    }
    console.log("---------------------------")
    let sql = "SELECT * FROM tbl_user where email = $1";
    db.query(sql, [req.body.email], (error,result) =>
    {   
        if (!result) {
            return res.status(400).send('user not found');
        }
        
       
        if(result.rows.length > 0 ){
            const user = result.rows[0];
            if(req.body.password == user.password ) {
                /**
                 *      Middle of token after decode
                 * {"id":11,"iat":1584888987,"exp":1584889047}
                 * 
                 */
                const payload = { id: user.id };
                const token = jwt.sign(payload, process.env.SECRET_OR_KEY,{expiresIn : '1m'});
                res.cookie("access_token", token, {
                    // secure: true,
                    httpOnly: true
                });
                const _request = req.headers;
                let cur_uuid = uuid().toString();

                _request.token = { 
                    cur_uuid : token 
                }
                console.log(`uu ${cur_uuid}`)

                client.set(cur_uuid,JSON.stringify(_request),(err,res )=> {
                    err ? console.log(err) : console.log(res)
                } )
                
                req.session.sid = cur_uuid;

                // console.log(_request)
                res.send(token);
            }else{
                console.log("not working")
                return res.status(401).send("not working" );
            }
        }else{
            res.send("user not found")
        }
       
     
       
    });
 
  }
);
/**
 *  Every access passport authenticated require token 
 *  ../config/authentication_token.passport.use(strategy)
 *  Strategy working every time protected endpoint is accessed 
 */
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('i\'m protected');
});


router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("---------------------------")
    console.log(req.session.sid)
    req.session.sid  = 100
    /**
     * device_session as key value
     */
    client.GET(req.session.sid,(error,result) => {
        if(error)
            console.log(error)
        else{
            if(result == null ) {
                console.log('access other device')
                res.send('access other device')
            }else
                res.send(JSON.parse(result)) 
        }
               
        
    } );
    // return res.send(req.user);
  });

router.post("/logout", (req, res, next) => {
    // Delete user refresh token from Redis
    redis.del(req.body.id);
    // ... and then remove httpOnly cookies from browser
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.redirect("/");
});

module.exports = router;