import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

// custom error and response format
import errorHandler from '../utils/errorHandler';
import responseHandler from '../utils/responseHandler';
// const { sendMail } = require('../helpers/email');

const { JWT_SECRET } = process.env;

exports.signUp = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    jobRole,
    department,
    address,
    isAdmin,
    role,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(new errorHandler(400, 'User already exist, please signIn.'));
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      gender,
      jobRole,
      department,
      address,
      isAdmin,
      role,
    });
    const createdUser = await user.save();
    if (createdUser.isAdmin == '' || createdUser.role == '') {
      createdUser.isAdmin = false;
      createdUser.role = 'employee';
    }
    const payload = {
      _id: createdUser._id,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      role: createdUser.role,
    };
    const token = await jwt.sign({ payload }, JWT_SECRET, {
      expiresIn: '1d',
    });
    return responseHandler(
      res,
      201,
      { createdUser, token },
      'User successfully created'
    );
  } catch (error) {
    console.log(error);
    return next(
      new errorHandler(500, 'Something went wrong, please try again')
    );
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new errorHandler(400, 'email does not exist'));
    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword)
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'User password is incorrect',
        },
      });
    const payload = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
    };
    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: '2h',
    });
    return responseHandler(
      res,
      200,
      { payload, token },
      'user loggedIn successfully'
    );
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, 'Server Error'));
  }
};
