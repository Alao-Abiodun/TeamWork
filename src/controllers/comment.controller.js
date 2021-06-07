import Comment from '../models/comment.model';

import customError from '../utils/errorHandler';
import responseHandler from '../utils/responseHandler';

import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

exports.createCommentArticle = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    return next(
      new customError(
        500,
        'Something went wrong, Please try again',
        error.message
      )
    );
  }
};
