require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { URI } = process.env;

// Connection to MongoDB
async function connect() {
  // Run MemoryServer if the environment is "test"
  if (process.env.NODE_ENV === 'test') {
    const mongoServer = new MongoMemoryServer();
    mongoServer.getUri().then((mongoUri) => {
      mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
      mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:'),
      );
      mongoose.connection.once('open', () => {
        console.log(
          'Fake database connection established successfully \n @',
          mongoUri,
        );
      });
    });
  } else {
    // else run live DB connection
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('MongoDB database connection established successfully');
    });
  }
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = { connect, disconnect };
