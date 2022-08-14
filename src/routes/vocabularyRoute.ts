import express from "express";
import { validatorError, validatorMiddle } from "../helper/validator";
import * as vocabularyController from "../controller/vocabularyController"
import { body, ValidationChain } from "express-validator";

const validatorVocabulary: ValidationChain[] = [
    body("name").exists().bail().notEmpty(), 
    body("type_id").exists({checkFalsy: true}).bail().notEmpty(),
    body("meaning").exists().bail().notEmpty(),
]

const vocabularyRouter = express.Router()
vocabularyRouter.get("/findAll", vocabularyController.findAll);
vocabularyRouter.get("/findAllPagination/:index/:size", vocabularyController.findAllPagination);
vocabularyRouter.get("/random", vocabularyController.random);
vocabularyRouter.post("/create", validatorVocabulary, validatorError, vocabularyController.create);
vocabularyRouter.delete("/deleteById/:id", vocabularyController.deleteById);
vocabularyRouter.put("/updateById/:id", validatorVocabulary, validatorError, vocabularyController.updateById);
export default vocabularyRouter