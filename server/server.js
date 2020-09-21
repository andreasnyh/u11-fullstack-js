require('dotenv').config();
const mongoose = require('mongoose');

const { URI } = process.env;

async function connect() {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = { connect, disconnect };
