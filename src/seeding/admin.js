import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import errorHandler from '../utils/errorHandler';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

let password = 'adminPassword';

const { JWT_SECRET } = process.env;

exports.seedAdmin = next => {
  try {
    // check if admin exist
    User.findOne({ role: 'admin' }, (err, admin) => {
      if (err) throw err;
      if (admin)
        return res.status(401).json({ message: 'admin already exist' });
    });
    User.create(
      {
        firstName: 'adminFirstName',
        lastName: 'adminLastName',
        email: 'adminEmail@gmail.com',
        jobRole: 'adminJobRole',
        department: 'adminDepartment',
        gender: 'adminGender',
        address: 'adminAddress',
        role: 'admin',
      },
      (err, user) => {
        if (err) throw err;
        let payload = {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          role: user.role,
        };
        const token = jwt.sign({ payload }, JWT_SECRET, {
          expiresIn: '1d',
        });
        if (user.role === 'admin') user.isAdmin = 'true';
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save((err, savedUser) => {
              if (err) throw err;
              console.log('Admin created');
            });
          });
        });
        console.log(token);
      }
    );
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, 'Server Error', error.message));
  }
};
