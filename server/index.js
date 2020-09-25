const express = require('express');
const cors = require('cors');
const notFound = require('./controllers/notfound.controller');
const { connect } = require('./server');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Router
const userRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');

// Routes
app.get('/api/', (req, res) => res.send({ message: 'Welcome to the API' }));
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.get('/api/*', notFound);

connect().then(
  app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
  }),
);
