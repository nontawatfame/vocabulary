import express from "express"
import authentication from "./authentication";
import vocabularyRouter from "./vocabularyRoute";
import typeRoute from "./typeRoute";


const api = express.Router();
api.use(authentication)
api.use("/type",typeRoute)
api.use("/vocabulary", vocabularyRouter)
export default api

