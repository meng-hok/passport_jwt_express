const dotenv = require("dotenv")
dotenv.config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractStrategy = passportJWT.ExtractJwt;
const UserModel = require('../models/Users')
const db = require('./connection');

const opts = { 
    jwtFromRequest : ExtractStrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
}

const strategy = new JwtStrategy(opts , (payload,next) => {
    /**
     *Strategy working every time protected endpoint is accessed 
     *
     */
    console.log(` JWTQueryByIdIs working here`)
    let sql = "SELECT * FROM tbl_user where id = $1";
    db.query(sql, [payload.id], (error, {rowCount, rows}) =>
    {      
        if(rowCount > 0 ){
            const user = rows[0]
            next(null,user)
        }
    });
   
    
})

passport.use(strategy)

module.exports = {passport}