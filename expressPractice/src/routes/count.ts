import express from 'express';
const routes = express.Router();

let count = 0;

routes.post('/', (req, res) => {
    res.json({
        count: count++
    })
})

routes.get('/add', (req, res) => {
    const amount = req.query.amount;

    // convert that to a number
    const number = Number.parseInt(amount as string);

    // add it to count
    count += number;

    // return the new count
    res.json({
        count: count
    })
})

// when you go to count-api/4
routes.get('/:number', (req, res) => {
    // get 4 from the url
    const amount = req.params.number;
    //conver that to a number
    const number = Number.parseInt(amount);

    // add it to count
    count += number;

    // return the new count
    res.json({
        count: count
    })
})

export default routes;