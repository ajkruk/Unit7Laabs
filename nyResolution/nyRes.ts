import express from 'express';

const routes = express.Router();

routes.post('/', (req, res) => {
    console.log(req.body);

    res.json({ created: true })
})

routes.get('/', (req, res) => {
    res.json({ resolutions: []})
})

routes.get('/:id', () => {
    res.json({})
})

routes.delete("/:id")
export default routes;