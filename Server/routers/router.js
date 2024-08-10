import expres from "express";
import { Home } from "../controllers/controller.js";
const router = expres();

router.get("/", Home);

export { router };
