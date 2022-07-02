import express from "express";
import { validatorMiddle } from "../helper/validator";
import * as vocabularyController from "../controller/vocabularyController"
import { body, ValidationChain } from "express-validator";

const validatorVocabulary: ValidationChain[] = [
    body("name").exists().bail().notEmpty(), 
    body("type_id").exists().bail().notEmpty(),
    body("meaning").exists().bail().notEmpty()
]

const vocabularyRouter = express.Router()
vocabularyRouter.get("/findAll", vocabularyController.findAll);
vocabularyRouter.post("/create", validatorMiddle(validatorVocabulary), vocabularyController.create);
vocabularyRouter.delete("/deleteById/:id", vocabularyController.deleteById);
vocabularyRouter.put("/updateById/:id", validatorMiddle(validatorVocabulary), vocabularyController.updateById);
export default vocabularyRouter