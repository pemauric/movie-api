import express, { Router, Request, Response } from 'express';

const router = Router();

import { MovieController } from '../controller/MovieController';

router.get('/')

export default router
    .get('/test', (req: Request, res: Response) =>{
        res.status(200).json({message: "API Working"});
    })
    .post('/movie', MovieController.createMovie)