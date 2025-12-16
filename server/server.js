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

//read a welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server. GET comfy!" });
  //   res.send("<h1>Welcome to the server. GET comfy!</h1>");
});

// read data from database
// if a category is selected, filter by that category
app.get("/events", async function (req, res) {
  const category = req.query.category;

  if (category) {
    const result = await db.query(
      `SELECT * FROM events WHERE category = $1 ORDER BY id DESC LIMIT 16;`,
      [category]
    );
    res.json(result.rows);
  } else {
    const hostedEventsGet = await db.query(
      `SELECT * FROM events ORDER BY id DESC LIMIT 16;`
    );
    res.json(hostedEventsGet.rows);
  }
});

// create data in database
app.post("/events", async function (req, res) {
  const {
    host_name,
    event_name,
    event_description,
    event_category,
    event_date,
    event_time,
  } = req.body;

  const query = db.query(
    `INSERT INTO events (host_name, event_name, event_description, event_category, event_date, event_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      host_name,
      event_name,
      event_description,
      event_category,
      event_date,
      event_time,
    ]
  );

  res.json({ message: "Event created successfully" });
});
