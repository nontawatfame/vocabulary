import express from "express";
import { body } from "express-validator";
import * as typeController from "../controller/typeController"
import { validatorError, validatorMiddle } from "../helper/validator";

const validatorType = [
    body("name").exists().bail().notEmpty(), 
]

const typeRouter = express.Router();
typeRouter.get("/findAll", typeController.findAll);
typeRouter.post("/create", validatorType, validatorError, typeController.create);
typeRouter.delete("/deleteById/:id", typeController.deleteById);
typeRouter.put("/updateById/:id", validatorType, validatorError,  typeController.updateById);
export default typeRouter