import express from "express"
import * as authController from "../controller/authController"

const authentication = express.Router();
authentication.post("/login", authController.login)
authentication.post("/register", authController.register)
export default authentication