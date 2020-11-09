const express = require('express');
const cors = require('cors');
const notFound = require('./controllers/notfound.controller');
const { connect } = require('./server');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Router
const { adminRouter, authRouter, userRouter, roomRouter } = require('./routes');

// Routes
app.get('/api/', (req, res) => res.send({ message: 'Welcome to the API' }));
app.use('/api/admin', adminRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/rooms', roomRouter);
app.get('/api/*', notFound);

connect().then(
  app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
  }),
);
