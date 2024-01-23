// require the express module
import express from 'express';
import resolutions from "./routes/resolutions";
// creates an instance of an Express server
const app = express();
// define the port
const port = 3000;


// allow POST and PUT requests to use JSON bodies
// app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for form data


// run the server
app.use("/resolutions", resolutions);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});