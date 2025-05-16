const express = require('express');
const router = express.Router();

const restaurantRoute = require('../routes/restaurant');
const aiRoute = require('../routes/ai');


const app = express();
app.use(express.json());


app.use('/restaurant', restaurantRoute);
app.use('/ai', aiRoute);
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.path });
  });


module.exports = app;
