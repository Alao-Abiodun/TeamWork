import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URI } = process.env;

const db = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connected successfully'))
  .catch(() => console.log('Error connection'));

export default db;
