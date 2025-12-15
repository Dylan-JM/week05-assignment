//imports
import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`Server is running in port ${PORT}`);
});

//config cors
app.use(cors());
app.use(express.json());

//TODO: READ a welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server. GET comfy!" });
  //   res.send("<h1>Welcome to the server. GET comfy!</h1>");
});
