import { NextFunction, Request, Response, } from "express";
import * as user from "../model/user";
import { RequestLogin, RequestRegister } from "../types/authType";
import * as bcrypt from "bcrypt"

export async function login(req: Request<any,any,RequestLogin>, res: Response, next: NextFunction) {
    try {
        let body: RequestLogin = req.body
        let resulteUser = await user.findByUsername(body.username)
        if (resulteUser.length == 0 || !(await bcrypt.compare(body.password,resulteUser[0].password))) {
            return res.status(500).json({ message: "Username and password are incorrect."})
        }



        res.json({
            status: 200,
            message: "success login",
        })
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
        await user.create(req.body)
        res.status(200).json({message: "register user successfully"})
    } catch (error) {
        next(error)
    }
}

