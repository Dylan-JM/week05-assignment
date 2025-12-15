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

//============================================================================
// Arron's code
// Getting some data from the DB relating to fetching event table rows
// ORDER BY id DESC LIMIT 16 defines how many results we want to get from the database, we can change this number if the page isn't populated with enough events.
app.get("/eventdisplay", async function (req, res) {
  const hostedEventsGet = await db.query(
    `SELECT * FROM events ORDER BY id DESC LIMIT 16;`
  );
  console.log(hostedEventsGet);
  res.json(hostedEventsGet.rows);
});

//============================================================================
