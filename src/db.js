import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model';
dotenv.config();
const user = require('./models/user.model');
const bcrypt = require('bcryptjs');

const { MONGO_URI } = process.env;

const db = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // .then(async () => {
  // const hash = await bcrypt.hash("abbey2020", 15);
  // const user = new User({
  //   firstName: "Abiodun",
  //   lastName: "Alao",
  //   isAdmin: true,
  //   email: "abiodundev@gmail.com",
  //   password: hash,
  //   gender: "Male",
  //   jobRole: "Software Developer",
  //   department: "IT",
  //   address: "Lagos, Nigeria",
  //   Date: Date.now(),
  // });
  // return await user.save();
  // })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(error => console.log(error));

export default db;

// ADMIN DETAILS
// EMAIL ADDRESS = abiodundev@gmail.com
// PASSWORD = abbey2020
