require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';

import houseConditionsRoute from '/routes/house-conditions';

// create app and use middlewares
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('It works'));

// attach routes
app.use('/api', houseConditionsRoute);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT}`)
);
