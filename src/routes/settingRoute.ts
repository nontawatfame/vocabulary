import express from "express";
import { body } from "express-validator";
import * as settingController from "../controller/settingController"
import { validatorError, validatorMiddle } from "../helper/validator";

const validatorSetting = [
    body("correct").exists().bail().notEmpty(), 
    body("condition_setting").exists().bail().notEmpty(), 

]


const settingRouter = express.Router();
settingRouter.post("/save", validatorSetting, validatorError, settingController.create);
settingRouter.get("/getSetting", settingController.getSetting);
settingRouter.put("/updateById/:id",validatorSetting, validatorError, settingController.updateById);
settingRouter.delete("/deleteById/:id", settingController.deleteById);
export default settingRouter