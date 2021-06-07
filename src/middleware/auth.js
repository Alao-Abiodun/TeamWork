import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import errorHandler from '../utils/errorHandler';

const { JWT_SECRET } = process.env;

exports.auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(
        new errorHandler(404, 'Request Headers Authorization is required')
      );
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return next(new errorHandler(401, 'Token expired'));
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return next(new errorHandler(401, 'Token is not recognised'));
    }
    req.user = decoded;
    next();
  } catch (e) {
    return next(new errorHandler(401, 'Server Error'));
  }
};

exports.checkIfUser = (req, res, next) => {
  if (req.user.payload.role !== 'admin') {
    return next(
      new errorHandler(401, 'users does not have access to this route...')
    );
  }
  return next();
};
