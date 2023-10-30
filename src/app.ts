//import modules
import express from 'express';
import config from 'config';

const app = express();

//import routes
import router from './routes/movie.routes';


//import database
import  connectDB  from './database/connect';

//import logger
import Logger from '../config/logger'

//import middlewares
import morganMiddleware from './middleware/morgan';


//port from config
const port: number = config.get('port');

//middleware
app.use(morganMiddleware);
app.use(express.json());
app.use("/api/", router);  


//server
app.listen(port, async () => {
    await connectDB();
    Logger.info(`Server listening on port ${port}`);
});


