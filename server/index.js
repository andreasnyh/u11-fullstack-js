// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./server');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

connect().then(
  app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
  }),
);
