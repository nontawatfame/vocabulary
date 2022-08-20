import { NextFunction, Request, Response, } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { validationResult } from "express-validator";
import path from "path";
import * as vocabulary from "../model/vocabulary";
import { Vocabulary, VocabularyTable } from "../types/vocabularyType";
import fs from 'fs'

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
            let nameFile = `${req.body.name}.${type}`;
            sound.mv(path.join(__dirname, "..", "..", `public`,"sound", nameFile), (error) => {
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
        // console.log(__dirname)
        // let dir = `${__dirname}/../../public/sound`
        // fs.readdirSync(dir).forEach(file => {
        //     console.log(file.split("."));
        //     let fileSplit = file.split(".")
        //     let fileName = fileSplit[0] + "." + "mp3"
        //     console.log(file)
        //     console.log(fileName)
        //     // fs.renameSync(`${dir}/${file}`, `${dir}/${fileName}`)
        // });

        let result = await vocabulary.findAll()
        console.log(result)
        result.forEach( async (value) => {
            let voca = value as Vocabulary;
            let name = (value.name as string).trim()
            console.log((value.sound as string).split("."))
            let fileSplit = (value.sound as string).split(".")
            let fileName = name + "." + "mp3"
            console.log(fileName)
            voca.name = name
            voca.sound = fileName
            // await vocabulary.updateById(value.id, voca);
        })


        let params = req.params
        let index = (params.index - 1) * params.size
        let search = req.query.search
        return res.status(200).json(await vocabulary.findAllPagination(index, params.size, search))
    } catch (error) {
        return next(error)
    }
}
