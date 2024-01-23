import express from "express";
import { Resolution } from "../models/Resolution";
import { getClient } from "../db";
const routes = express.Router();

const resolutions: Resolution[] = [];

// all of our endpoints will go here
// add a new resolution
// localhost:3000/new-years/ POST
routes.post("/", async (req, res) => {
  console.log(req.body);

  const goal = req.body.goal;

  // convert to number (int)
  const priority = parseInt(req.body.priority);

  // due date
  const dueDate = new Date(req.body.dueDate);

  // get the data from req.body and create a resolution
  const resolution = {
    goal,
    priority,
    dueDate,
    completed: false,
  };

  try {
    // connecting to mongodb
    const client = await getClient();
    // db.resolutions.insertOne
    await client
      .db("grandCircus")
      .collection<Resolution>("resolutions") // use Resolution interface, and resolutions collection
      .insertOne(resolution); // insert our object

    res.status(201).json(resolution); // return a 201: Created with the record that we created
  } catch (err) {
    res.status(500).json({ err }); // returns a 500: Internal Server Error with the actual error
  }
});

// get a list of resolutions
routes.get("/", async(req, res) => {
  try {
    const client = await getClient();
    const results = await client.db('grandCircus').collection<Resolution>('resolutions').find().toArray();

    res.json(results)
  } catch(err) {
    res.status(500).json(err)
  }
});

// get a specific resolution
routes.get("/:resolution", (req, res) => {
  // get the id parameter
  const index = parseInt(req.params.resolution); // matches what comes after :

  res.json(resolutions[index]);
});

// mark a resolution as complete
routes.put("/:id", (req, res) => {
  const index = parseInt(req.params.id);

  const resolution = resolutions[index];

  if (req.body.completed === "true") {
    resolution.completed = true;
  } else {
    resolution.completed = false;
  }

  res.json({});
});

// delete resolution
routes.delete("/:id", (req, res) => {
  const index = parseInt(req.params.id);

  // remove an item by its index
  resolutions.splice(index, 1);

  res.json({ deleted: true, resolutions });
});

export default routes;