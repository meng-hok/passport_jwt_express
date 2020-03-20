const userRouter = require('../controllers/user');
const appRouter = (app) =>
{
    //Write your route here:
    app.use('/weapi/v1', userRouter);




    

}

module.exports = appRouter;