import express from "express"
import authentication from "./authentication";

const api = express.Router();
api.use(authentication)
api.get("/test", async (req, res) => {
    res.json({test:2200})
})

export default api