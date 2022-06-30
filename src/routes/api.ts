import express from "express"
import authentication from "./authentication";
import * as typeController from "../controller/typeController"

const api = express.Router();
api.use(authentication)
api.get("/getTypes", typeController.getTypes);

export default api