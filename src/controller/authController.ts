import { NextFunction, Request, Response, } from "express";
import * as user from "../model/user";
import { RequestLogin, RequestRegister, ResponseLogin } from "../types/authType";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export async function login(req: Request<any,any,RequestLogin>, res: Response, next: NextFunction) {
    try {
        let body: RequestLogin = req.body
        let resulteUser = await user.findByUsername(body.username)
        if (resulteUser.length == 0 || !(await bcrypt.compare(body.password,resulteUser[0].password))) {
            return res.status(500).json({ message: "Username and password are incorrect."})
        }

        let reslogin: ResponseLogin = {
            accessToken : await jwt.sign({username: resulteUser[0].username}, process.env.SECRET_TOKEN as string, {expiresIn: "30m"}),
            refreshToken : await jwt.sign({username: resulteUser[0].username}, process.env.SECRET_TOKEN as string, {expiresIn: "60m"})
        }

        res.status(200).json(reslogin)
    } catch (error) {
        next(error)
    }
  
}

export async function register(req: Request<any, any, RequestRegister>, res: Response, next: NextFunction) {
    try {
        let body: RequestRegister = req.body
        if (body.password.length < 8) {
            return res.status(500).json({ message: "password must be at least 8 characters"})
        }

        if (body.confirmPassword != body.password) {
            return res.status(500).json({ message: "Password does not match Confirm Password"})
        }

        let resulteUser = await user.findByUsername(body.username)
        if (resulteUser.length > 0) {
            return res.status(500).json({ message: "Username already exists"})
        }

        let salt = await bcrypt.genSalt(10)
        body.password = await bcrypt.hash(body.password, salt);
        let message = 'Error in creating user';
        if (await user.create(req.body)) {
            message = 'register user successfully';
        }
        res.status(200).json({message})
    } catch (error) {
        next(error)
    }
}

export function verifyToken(req: Request<any, any, any>, res: Response, next: NextFunction) {
    try {
        res.status(200).json({verifyToken: true})
    } catch (error) {
        next(error)
    }
}

