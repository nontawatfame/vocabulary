import { NextFunction, Request, Response, } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { validationResult } from "express-validator";
import path from "path";
import * as vocabulary from "../model/vocabulary";
import { Vocabulary, VocabularyTable } from "../types/vocabularyType";
import fs from 'fs'


let pathSound =  ((process.env.RUN_START as string) == "production") ? 
    path.join(__dirname, "..",  "..", "..",  `public`,"sound")
    : path.join(__dirname, "..",  "..", `public`,"sound")

export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await vocabulary.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function create(req: any, res: Response, next: NextFunction) {
    try {
        let checkName1: any = false  
        req.body.name = (req.body.name as string).trim()
        let result = await vocabulary.checkName(req.body.name)
        if (result.length > 0) {
            result.forEach(value => {
                if (value.type_id == req.body.type_id) {
                    checkName1 = true
                }
            })
            if (checkName1 == true) {
                return res.status(405).json({errorMessage: `Duplicate entry ${req.body.name}`})
            }
        }

        req.body.sound = ""
        if (req.files != null) {
            let sound : UploadedFile = req.files.sound; 
            let type = path.extname(sound.name)
            let nameFile = `${req.body.name}${type}`;
            sound.mv(`${pathSound}/${nameFile}`, (error) => {
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
        let result = await vocabulary.findById(req.params.id) as VocabularyTable[]
        console.log(result)
        let resultCheckName = await vocabulary.checkName(req.body.name)
        let checkName: any = false
        if (resultCheckName.length > 0) {
            resultCheckName.forEach(value => {
                if (value.name == req.body.name && value.type_id == req.body.type_id) {
                    if (value.name != result[0].name || value.type_id != result[0].type_id) {
                        checkName = true
                    }
                }
            })
            if (checkName == true) {
                return res.status(405).json({errorMessage: `Duplicate entry ${req.body.name}`})
            }
        }
        req.body.sound = result[0].sound
        if (req.files != null) {
            let sound : UploadedFile = req.files.sound; 
            let type = path.extname(sound.name)
            let nameFile = `${req.body.name}${type}`;
            sound.mv(`${pathSound}/${nameFile}`, (error) => {
                console.log(error)
            })
            req.body.sound = nameFile
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

export async function findAllPagination(req: Request<{index: number, size: number},any,any,{search: string}>, res: Response, next: NextFunction) {
    try {
        let params = req.params
        let index = (params.index - 1) * params.size
        let search = req.query.search
        return res.status(200).json(await vocabulary.findAllPagination(index, params.size, search))
    } catch (error) {
        return next(error)
    }
}
