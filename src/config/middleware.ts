import { NextFunction, Request, Response } from "express";

const ignoreUrl: Array<string> = [
    "/login",
    "/register"
] 

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers)
    console.log(req.url)

    for (const url of ignoreUrl) {
        if (req.url.indexOf(url) == 0) {
            next()
            return
        }
    }
    
    res.json({
        status: 401,
        message: "auth"
    })

}
