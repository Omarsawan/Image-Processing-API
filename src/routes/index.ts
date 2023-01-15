import express from 'express';
const routes = express.Router();

routes.get('/api', (req, res) => {
res.send('Hello man, world!');
});

export default routes;