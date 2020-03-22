const userRouter = require('../controllers/user');
const AuthenticationController = require("../controllers/AuthenticationController");
const appRouter = (app) =>
{
    //Write your route here:
    app.use('/', userRouter);
    app.use('/auth',AuthenticationController)



    

}

module.exports = appRouter;