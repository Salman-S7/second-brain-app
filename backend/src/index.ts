import express from "express";
import cors from "cors";
import router from "./routes/pageRoutes";
import dotenv from "dotenv";
import connectToDb from "./config/db";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

connectToDb();

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
