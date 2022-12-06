import { SentencesDetailType } from './../types/sentencesType';
import { NextFunction, Request, Response, } from "express";
import * as sentencesDetailService from "../model/sentencesDetail";


export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await sentencesDetailService.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function create(req: Request<any, any, SentencesDetailType>, res: Response, next: NextFunction) {
    try {
        let message = 'Error in creating type';
        if (await sentencesDetailService.create(req.body)) {
            message = 'created type successfully';
        }
        res.status(200).json({message})
    } catch (error: any) {        
        if (error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({message: `Duplicate entry sentencesDetail`})
        }
        return next(error)
    }
}

export async function deleteById(req: Request<{id: number}>, res: Response, next: NextFunction) {
    try {
        let message = "Error in delete type"
        if (await sentencesDetailService.deleteById(req.params.id)) {
            message = "delete type successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}

export async function updateById(req: Request<{id: number}, any, SentencesDetailType>, res: Response, next: NextFunction) {
    try {
        let message = "Error in Update type"
        if (await sentencesDetailService.updateById(req.params.id, req.body)) {
            message = "update type successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}
