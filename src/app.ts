//import modules
import express from 'express';

const port: number = 3000

const app = express();

//middleware
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


