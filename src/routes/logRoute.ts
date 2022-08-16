import express from "express";
import { body } from "express-validator";
import * as logController from "../controller/logController"
import { validatorError, validatorMiddle } from "../helper/validator";

const validatorLog = [
    body("vocabulary_id").exists().bail().notEmpty(), 
    body("user_id").exists().bail().notEmpty(), 
    body("correct").exists().bail().notEmpty(), 
]

const validatorLogDetail = [
    body("logDetailList").exists({checkNull: true}), 
]

const logRouter = express.Router();
logRouter.post("/createLogDetail", validatorLogDetail, validatorError, logController.createLogDetail);
logRouter.get("/getLogHistory", logController.getLogHistory);
logRouter.get("/getLogDetailById/:id", logController.getLogDetailById);
export default logRouter