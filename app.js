var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv")
const {v4 : uuid} = require('uuid')
dotenv.config();
const passport = require('./configs/authentication_token').passport;
//const redius = require("./configs/redis_configuration")
var app = express();
var session = require('express-session')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
//app.use('/weapi/v1', userRouter);

require('./configs/route')(app);
app.use(passport.initialize());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const redis = require("redis");
const jwt = require('jsonwebtoken');
var client  = redis.createClient();
client.on("connect", function () {
    console.log("Redis plugged in.");
});
/*
client.set('stringkey', 'string val', redis.print)
client.hset('hash key', 'hashtest 1', 'some value', redis.print)
client.set("heymenghok", "yesim", function (error, reply){
  error ? console.log(error) : console.log(reply)
});

client.get("heymenghok",(error,reply) => {
  console.log(`im result`)
  error ? console.log(error) : console.log(reply)
})*/
module.exports = app;
