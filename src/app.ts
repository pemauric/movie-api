//import modules
import express from 'express';
import config from 'config';

const app = express();

//import routes
import router from './routes/movie.routes';

app.use("/api/", router);  

//import database
import  connectDB  from './database/connect';

//import logger
import Logger from '../config/logger'

//port from config
const port: number = config.get('port');

//middleware
app.use(express.json());

//server
app.listen(port, async () => {
    await connectDB();
    Logger.info(`Server listening on port ${port}`);
});


