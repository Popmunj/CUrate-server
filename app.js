const express = require('express');
const cors = require('cors');

const restaurantRoute = require('./routes/restaurant');
// const aiRoute = require('./routes/restaurants');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/restaurant', restaurantRoute);
// app.use('/ai', aiRoute);


module.exports = app;
