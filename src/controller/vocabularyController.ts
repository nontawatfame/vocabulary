import { NextFunction, Request, Response, } from "express";
import { validationResult } from "express-validator";
import * as vocabulary from "../model/vocabulary";
import { Vocabulary } from "../types/vocabularyType";


export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await vocabulary.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function create(req: Request<any, any, Vocabulary>, res: Response, next: NextFunction) {
    try {
        let message = 'Error in creating vocabulary';
        if (await vocabulary.create(req.body)) {
            message = 'created vocabulary successfully';
        }
        return res.status(200).json({message})
    } catch (error: any) {        
        if (error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({message: `Duplicate entry ${req.body.name}`})
        }
        return next(error)
    }
}

export async function deleteById(req: Request<{id: number}>, res: Response, next: NextFunction) {
    try {
        let message = "Error in delete vocabulary"
        if (await vocabulary.deleteById(req.params.id)) {
            message = "delete vocabulary successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}

export async function updateById(req: Request<{id: number}, any, Vocabulary>, res: Response, next: NextFunction) {
    try {
        let message = "Error in Update vocabulary"
        if (await vocabulary.updateById(req.params.id, req.body)) {
            message = "update vocabulary successfully"
        }
        return res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}
