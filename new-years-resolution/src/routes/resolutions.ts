
// require the express module
import express from "express";
import { Resolution } from '../models/Resolution';
// create a new Router object
const routes = express.Router();

const resolutions : Resolution[] = [{
    deadline: new Date('12-31-2024'),
    goal: "Work out",
    completed: false,
    priority: 1
}]

routes.get('/', (req, res) => {
    res.json(resolutions)
})

routes.post('/', (req, res) => {
    const data: Resolution = {
        goal: req.body.goal,
        completed: false,
        priority: 1
    }

    if (req.body['due-date']) {
        data.deadline = new Date(req.body['due-date']);
    }

    if (req.body.completed) {
        data.completed = true;
    } 

    if (req.body.priority) {
        data.priority = Number.parseInt(req.body.priority)
    }

    resolutions.push(data);

    res.sendStatus(201)

})

export default routes;