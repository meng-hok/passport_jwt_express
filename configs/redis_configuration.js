const RedisJwt = require('redis-jwt');

const _redius = new RedisJwt({
    //host: '/tmp/redis.sock', //unix domain
    host: '127.0.0.1', //can be IP or hostname
    port: 6379, // port
    // maxretries: 10, //reconnect retries, default 10
    //auth: '123', //optional password, if needed
    // db: 0, //optional db selection
    secret: 'secret', // secret key for Tokens!
    multiple: false, // single or multiple sessions by user
    kea: false // Enable notify-keyspace-events KEA
});

// _redius.sign('507f191e810c19729de860ea').then(token => {
//     r.verify(token).then(decode => {
//     // [Object]
//     }).catch(err => {
//     // Wrong token
//     });
// });

module.exports = _redius;