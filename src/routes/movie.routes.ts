import express, { Router, Request, Response } from 'express';

const router = Router();

//import class 
import { MovieController } from '../controller/MovieController';

//import validate
import { validate } from '../middleware/handleValidation';
import { movieCreateValidation } from '../middleware/movieValidation';

export default router
    .get('/test', (req: Request, res: Response) =>{
        res.status(200).json({message: "API Working"});
    })
    .post('/movie', movieCreateValidation(), validate, MovieController.createMovie)
    .get('/movie/:id', MovieController.getMovieById)
    .get('/movie', MovieController.getAll)
    .delete('/movie/remove/:id', MovieController.deleteMovieById)
    .patch('/movie/:id', movieCreateValidation(), validate, MovieController.editMovieById)
    