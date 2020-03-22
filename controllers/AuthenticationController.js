// const User = require('../models/Users');
const router = require('express').Router();
const passport = require('../configs/authentication_token').passport;
const jwt = require('jsonwebtoken');
const db = require('../configs/connection');
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
    return res.send(req.user);
  });

module.exports = router;