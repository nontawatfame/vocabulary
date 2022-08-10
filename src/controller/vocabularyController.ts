import { NextFunction, Request, Response, } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { validationResult } from "express-validator";
import path from "path";
import * as vocabulary from "../model/vocabulary";
import { Vocabulary } from "../types/vocabularyType";


export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await vocabulary.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function create(req: any, res: Response, next: NextFunction) {
    try {
        console.log(req.body)
        console.log(req.files)
        req.body.sound = ""
        if (req.files != null) {
            let sound : UploadedFile = req.files.sound; 
            console.log(sound)
            let type = sound.name.split(".")[1]
            let nameFile = `${req.body.name}.${type}`;
            sound.mv(path.join(__dirname, "..", "..", `public`,"sound", nameFile), (error) => {
                console.log(error)
            })
            req.body.sound = nameFile
        }

        

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

export async function updateById(req: any, res: Response, next: NextFunction) {
    try {
        if (req.files != null) {
            let sound : UploadedFile = req.files.sound; 
            console.log(sound)
            let type = sound.name.split(".")[1]
            sound.name = "test1"
            sound.mv(path.join(__dirname, "..", "..", `public`,"sound", `${req.body.name}.${type}`), (error) => {
                console.log(error)
            })
        }

        let message = "Error in Update vocabulary"
        if (await vocabulary.updateById(req.params.id, req.body)) {
            message = "update vocabulary successfully"
        }
        return res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}

export async function random(req: Request<any>, res: Response, next: NextFunction) {
    try {
        return res.status(200).json(await vocabulary.random())
    } catch (error) {
        return next(error)
    }
}
