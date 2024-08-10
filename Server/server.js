import express from "express";
import dotenv from "dotenv";
import { router } from "./routers/router.js";
import { apiRouter } from "./routers/apiRouter.js";
import cors from "cors";
import bodyParser from "body-parser";

// DOTENV
dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT;

// CORS
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// ROUTERS
app.use(router);
app.use(apiRouter);

app.listen(port, () => {
  console.log(
    `Server listening at port ${port}\nLink: http://localhost:${port}`
  );
});
