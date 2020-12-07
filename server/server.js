require('dotenv').config();
const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
const { Role, roleList } = require('./models');

const { URI } = process.env;

mongoose.set('useFindAndModify', false);

function init() {
  Role.estimatedDocumentCount((error, count) => {
    if (error) return console.error('error', error);

    if (!error && count === 0) {
      for (let i = 0; i < roleList.length; i++) {
        new Role({
          name: roleList[i],
        }).save((err) => {
          if (err) return console.error('error', err);
          return console.log(`Added role: ${roleList[i]} to database`);
        });
      }
    }
    return console.log('Role init');
  });
}

// Connection to MongoDB
async function connect() {
  // Run MemoryServer if the environment is "test"
  if (process.env.NODE_ENV === 'test') {
    // This is commented to avoid errors on deploy
    /* const mongoServer = new MongoMemoryServer({ binary: { version: '4.2.0' } });
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
    }); */
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
      init();
      console.log('MongoDB connection established successfully');
    });
  }
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = { connect, disconnect };
