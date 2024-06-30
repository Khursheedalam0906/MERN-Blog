import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Dbconnection } from "./database/DbConfig.js";
import router from "./routes/route.js";

const PORT = 8000;
Dbconnection();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
