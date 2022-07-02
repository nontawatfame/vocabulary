import { NextFunction, Request, Response, } from "express";
import * as type from "../model/type";


export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await type.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function create(req: Request<any, any, {name: string}>, res: Response, next: NextFunction) {
    try {
        let message = 'Error in creating type';
        if (await type.create(req.body.name)) {
            message = 'created type successfully';
        }
        res.status(200).json({message})
    } catch (error: any) {        
        if (error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({message: `Duplicate entry ${req.body.name}`})
        }
        return next(error)
    }
}

export async function deleteById(req: Request<{id: number}>, res: Response, next: NextFunction) {
    try {
        let message = "Error in delete type"
        if (await type.deleteById(req.params.id)) {
            message = "delete type successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}

export async function updateById(req: Request<{id: number}, any, {name: string}>, res: Response, next: NextFunction) {
    try {
        let message = "Error in Update type"
        if (await type.updateById(req.params.id, req.body.name)) {
            message = "update type successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}
