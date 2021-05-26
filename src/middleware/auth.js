import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      return res.status(401).json({
        error: 'Token is not verified',
      });
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (e) {
    res.status(401).send({ error: 'Token expired' });
  }
};

exports.checkIfUser = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'users does not have access to this route...' });
  }
  return next();
};
