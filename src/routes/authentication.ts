import express from "express"
import { body } from "express-validator";
import * as authController from "../controller/authController"
import { validatorError, validatorMsg } from "../helper/validator";

const validatorLog = [
    body("username").exists().withMessage(validatorMsg.exists).bail().notEmpty().withMessage(validatorMsg.exists), 
    body("password").exists().withMessage(validatorMsg.exists).bail().notEmpty().withMessage(validatorMsg.exists).bail().isLength({min: 8}).withMessage(validatorMsg.isLength(8)), 
]

const authentication = express.Router();
authentication.post("/login", validatorLog, validatorError ,authController.login)
authentication.post("/register", authController.register)
authentication.post("/verifyToken", authController.verifyToken)
export default authentication