import express from "express";
import { body } from "express-validator";
import * as logController from "../controller/logController"
import { validatorError, validatorMiddle } from "../helper/validator";

const validatorLog = [
    body("vocabulary_id").exists().bail().notEmpty(), 
    body("user_id").exists().bail().notEmpty(), 
    body("correct").exists().bail().notEmpty(), 
]

const logRouter = express.Router();
logRouter.get("/findAll", logController.findAll);
logRouter.post("/create", validatorLog, validatorError, logController.create);
logRouter.delete("/deleteById/:id", logController.deleteById);
logRouter.put("/updateById/:id", validatorLog, validatorError, logController.updateById);
export default logRouter