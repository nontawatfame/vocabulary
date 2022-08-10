import { LogType, logDetailType } from './../types/logType';
import { NextFunction, Request, Response, } from "express";
import * as log from "../model/log";
import * as logDetail from "../model/logDetail";
import moment from 'moment';


export async function createLogDetail(req: Request<any,any,{logDetailList: logDetailType[]}, any, LogType>, res: Response, next: NextFunction) {
    try {
        console.log(req.body.logDetailList)
        let logDetailList = req.body.logDetailList
        let correct_total = 0
        let incorrect_total = 0

        logDetailList.forEach(value => {
            if (value.correct == 1) {
                correct_total += 1
            } else if (value.incorrect == 1) {
                incorrect_total += 1
            }
        })

        let logH: LogType = {
            user_id: 37,
            correct_total: correct_total,
            incorrect_total: incorrect_total
        }

        let result = await log.create(logH)
        let logId = result.insertId
        
        logDetailList.forEach(async (value) => {
            let logDetailReq: logDetailType = {
                log_id: logId,
                vocabulary_id: value.vocabulary_id,
                correct: value.correct,
                incorrect: value.incorrect
            }
            console.log(logDetailReq)
            await logDetail.create(logDetailReq)
        })

        res.status(200).json("create log_detail successfully")
    } catch (error) {
        return next(error)
    }
}

export async function getLogHistory(req: Request<any>, res: Response, next: NextFunction) { 
    try {
        let time = moment().format("YYYY-MM-DD")
        let result = await log.getLogHistory(time)
        res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}
