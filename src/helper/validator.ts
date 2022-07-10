import express, { NextFunction, Request, Response} from "express";
import { ValidationChain, validationResult } from "express-validator";
import { Vocabulary } from "../types/vocabularyType";

const validatorRouter = express.Router();

export function validatorError(req: Request<any,any,any,any>, res: Response, next: NextFunction){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
}

export function validatorMiddle(arrayVal: ValidationChain[]): any {
  validatorRouter.use(...arrayVal, validatorError)
  return validatorRouter;
}

export const validatorMsg = {
  exists: "field is required",
  isLength: (len: number) => {
    return `must be at least ${len} characters`
  }
}

