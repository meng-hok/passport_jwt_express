const userRouter = require('../controllers/user');
const AuthenticationController = require("../controllers/AuthenticationController");
const RedisController = require("../controllers/RediusJwtController");
const appRouter = (app) =>
{
    //Write your route here:
    app.use('/', userRouter);
    app.use('/auth',AuthenticationController)
   app.use('/redis',RedisController)


    

}

module.exports = appRouter;