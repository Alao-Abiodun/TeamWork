import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// mongodb+srv://alaoabiodun:alao1996@cluster0.jbxby.mongodb.net/teamwork-db?retryWrites=true&w=majority

const { MONGO_URI } = process.env;

const db = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(error => console.log(error));

export default db;

// ADMIN DETAILS
// EMAIL ADDRESS = abiodundev@gmail.com
// PASSWORD = abbey2020
