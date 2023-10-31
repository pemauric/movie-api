import { Request, Response } from 'express';

import { isValidObjectId  } from 'mongoose';

import { IgetMovie, IMovie } from '../interface/Movie'

//model
import { MovieModel } from "../models/Movie";

//logger 
import Logger from '../../config/logger';

export class MovieController { 
    
    static async createMovie(req: Request, res: Response) {
        try {
            
            const data: IMovie = req.body
            
            const movie = await MovieModel.create(data);
            
            res.status(201).json({ message: "Movie created successfully", movie})

            Logger.info("Movie created successfully");

        } catch (e: any) {
        
            Logger.error(`Error: ${e.message}`)
            return res.status(404).json({error: "Erro ao criar, tente novamente!", e})

        }
    }

    static async getMovieById(req: Request, res: Response) {

        try {
            const id: string = req.params.id

            if(!isValidObjectId(id)) {
                return res.status(422).json({message: 'ID is not a valid'})
            }

            const movie: IgetMovie | null = await MovieModel.findById(id);

            if (!movie) {
                return res.status(404).json({error: "Movie not exist"})
            }
            
            Logger.info("Movie found successfully");

            
            return res.status(200).json({movie})

        } catch (e: any) {
            Logger.error(`Error: ${e.message}`)
            return res.status(404).json({error: "Erro ao buscar, tente novamente!", e})
        }
    }

    static async getAll(req: Request, res: Response) {

        try {
            
            const movies: Object = await MovieModel.find();

            Logger.info("Movie found successfully")

            return res.status(200).json({movies})

        } catch (e: any) {
            Logger.error(`Error: ${e.message}`)
            return res.status(404).json({error: "Erro ao buscar, tente novamente!", e})
        }   
    }

    static async deleteMovieById(req: Request, res: Response) {

        try {
            
            const id: string = req.params.id;

            if(!isValidObjectId(id)) {
                return res.status(422).json({message: 'ID is not a valid'})
            }
            
            const movie: IgetMovie | null  = await MovieModel.findById(id)

            if (!movie) {
                return res.status(404).json({error: "Movie not exist"})
            }

            await MovieModel.findByIdAndDelete(id);

            Logger.info("Movie delete successfully")

            return res.status(200).json({message:"Movie deleted successfully"});

        } catch (e: any) {
            Logger.error(`Error: ${e.message}`)
            return res.status(404).json({error: "Erro ao remover, tente novamente!", e})
        }
    }

    static async editMovieById(req: Request, res: Response) {
        try {
            const id: string = req.params.id
            const data: IMovie = req.body

            if(!isValidObjectId(id)) {
                return res.status(422).json({message: 'ID is not a valid'})
            }

            const movie: IgetMovie | null = await MovieModel.findById(id)

            if(!movie) {
                return res.status(404).json({message: 'Movie not exist'})
            }

            const filter: Object = {_id: id}

            const updateMovie = await MovieModel.updateOne(filter, data )
            
            Logger.info("Movie updated successfully")

            return res.status(200).json({message:"Movie updated successfully", updateMovie});


        } catch (e: any) {
            Logger.error(`Error: ${e.message}`)
            return res.status(404).json({error: "Erro ao remover, tente novamente!", e})
        }

    }
    
}
