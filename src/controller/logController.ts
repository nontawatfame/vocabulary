import { LogType } from './../types/logType';
import { NextFunction, Request, Response, } from "express";
import * as log from "../model/log";


export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await log.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function create(req: Request<any, any, LogType>, res: Response, next: NextFunction) {
    try {
        console.log("createLog")
        let message = 'Error in creating log';
        if (await log.create(req.body)) {
            message = 'created log successfully';
        }
        res.status(200).json({message})
    } catch (error: any) {        
        return next(error)
    }
}

export async function deleteById(req: Request<{id: number}>, res: Response, next: NextFunction) {
    try {
        let message = "Error in delete log"
        if (await log.deleteById(req.params.id)) {
            message = "delete log successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}

export async function updateById(req: Request<{id: number}, any, LogType>, res: Response, next: NextFunction) {
    try {
        let message = "Error in Update log"
        if (await log.updateById(req.params.id, req.body)) {
            message = "update log successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}
