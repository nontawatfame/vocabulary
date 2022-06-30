import { NextFunction, Request, Response, } from "express";
import * as type from "../model/type";


export async function getTypes(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await type.findAll())
    } catch (error) {
        next(error)
    }
  
}

