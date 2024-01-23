// starting place for express
import express from "express";
import count from "./routes/count";
import newYear from './routes/newYear';
import cors from 'cors';

// creating our server
const app = express();

// add logic to the app
// using app.use
// app.get

// when I go to the base url
app.get('/', (req, res) => {
    // return a response with this data
    res.json({
        message: "Welcome to our API!"
    })
})

// allows us to convert api request bodies into json data
// app.use is a way of adding funcitonality to our API via modules
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for form data

app.use(cors());

// attaching the count route to our main server
app.use('/cart-items', count);
app.use('/new-years', newYear)

// our server is going listen at this port
// kind of like a telephone number
const port = 3000;

// localhost:3000

// app.listen
// server starts listening for requests
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));