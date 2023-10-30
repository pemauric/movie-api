import { Request, Response } from 'express';

//model
import { MovieModel } from "../models/Movie";

//logger 
import Logger from '../../config/logger';

export class MovieController { 
    
    static async createMovie(req: Request, res: Response) {
        res.status(200).json({message: 'Movie created successfully'});
    }
}