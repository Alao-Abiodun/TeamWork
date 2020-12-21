import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      return res.status(401).json({
        error: 'Token is not verified',
      });
    const decoded = await jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
