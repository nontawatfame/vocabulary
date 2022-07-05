import express from "express"
import authentication from "./authentication";
import vocabularyRouter from "./vocabularyRoute";
import typeRoute from "./typeRoute";
import logRouter from "./logRoute";


const api = express.Router();
api.use(authentication)
api.use("/type",typeRoute)
api.use("/vocabulary", vocabularyRouter)
api.use("/log", logRouter)
export default api

