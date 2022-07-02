import express from "express";
import * as typeController from "../controller/typeController"

const typeRouter = express.Router();
typeRouter.get("/findAll", typeController.findAll);
typeRouter.post("/create", typeController.create);
typeRouter.delete("/deleteById/:id", typeController.deleteById);
typeRouter.put("/updateById/:id", typeController.updateById);
export default typeRouter