import express from 'express';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.route';
import gifRoutes from './routes/gif.route';
import articleRoutes from './routes/article.route';

const { seedAdmin } = require('./seeding/admin');
// console.log(seedAdmin());

const app = express();
const { PORT } = process.env;

app.use(express.json());

import db from './db';
db;

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get('/', (req, res) => {
  res.send('This is the main index route');
});

// create a new user
app.use('/api/v1', userRoutes);

// create a gif image
app.use('/api/v1', gifRoutes);

// create an article
app.use('/api/v1', articleRoutes);

app.listen(PORT, () => {
  console.log(`connected to PORT ${PORT}`);
});
