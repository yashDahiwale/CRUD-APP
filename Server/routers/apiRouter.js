import express from "express";
import { fetchAllData , PostFormData , deleteEntry , updateEntry } from "../controllers/apiController.js";
import "../database/connect.js";

const apiRouter = express();

apiRouter.get("/fetchAllData", fetchAllData);

apiRouter.post("/formData", PostFormData);

apiRouter.delete("/delete/:id", deleteEntry);

apiRouter.put("/updateData", updateEntry);

export { apiRouter };
