import { NextFunction, Request, Response, } from "express";
import * as setting from "../model/setting";
import * as userService from "../model/user";
import {SettingRequest} from "../types/settingType";


export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json(await setting.findAll())
    } catch (error) {
        return next(error)
    }
}

export async function getSetting(req: Request, res: Response, next: NextFunction) {
    try {
        let users = await userService.findAll()
        let user: any;
        if (users != null) {
            user = users[0]
        }

        res.status(200).json(await setting.findByUserId(user.id))
    } catch (error) {
        return next(error)
    }
}

export async function create(req: Request<any, any, SettingRequest>, res: Response, next: NextFunction) {
    try {
        let users = await userService.findAll()
        let user: any;
        if (users != null) {
            user = users[0]
        }
        let message = 'Error in creating type';
        let create: any = await setting.create(req.body, user.id)
        if (create) {
            message = 'created type successfully';
            if (create.code == "ER_DUP_ENTRY") {
                let resultUpdate = await setting.updateByUserId(user.id, req.body);
                if (resultUpdate) {
                    message = 'update type successfully';
                }
            }
        }
        res.status(200).json({message})
    } catch (error: any) { 
        return next(error)
    }
}

export async function deleteById(req: Request<{id: number}>, res: Response, next: NextFunction) {
    try {
        let message = "Error in delete type"
        if (await setting.deleteById(req.params.id)) {
            message = "delete type successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}

export async function updateById(req: Request<{id: number}, any, SettingRequest>, res: Response, next: NextFunction) {
    try {
        let users = await userService.findAll()
        let user: any;
        if (users != null) {
            user = users[0]
        }
        let message = "Error in Update type"
        if (await setting.updateById(req.params.id ,req.body, user.id)) {
            message = "update type successfully"
        }
        res.status(200).json({message})
    } catch (error) {
        return next(error)
    }
}
