import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

const ignoreUrl: Array<string> = [
    "/login",
    "/register"
] 

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        for (const url of ignoreUrl) {
            if (req.url.indexOf(url) == 0) {
                return next()
            }
        }
        if (req.headers.authorization != undefined || req.headers.authorization != null) {
            let authorization = req.headers.authorization.split(" ")
            if (authorization[0] == "Bearer") {
                let token = authorization[1]
                const payload: any = await jwt.verify(token, process.env.SECRET_TOKEN as string)
                if (payload) {
                    return next()
                }
            }
        }
        return res.json({
            status: 401,
            message: "unauthorization"
        })
    } catch (error) {
        if (error instanceof jwt.NotBeforeError) {
            console.log("NotBeforeError")
        }
        if (error instanceof jwt.TokenExpiredError) {
            console.log("TokenExpiredError")
            return res.json({
                status: 401,
                message: error.message
            })
        }
        return res.json({
            status: 401,
            message: "unauthorization"
        })
    }
    

}
