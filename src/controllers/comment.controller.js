import Comment from '../models/comment.model';

import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

class CommentController {
  async createCommentArticle(req, res) {
    try {
    } catch (error) {
      return res.status(500).json({
        status: error,
        error: new Error('Server Error'),
      });
    }
  }
}

export default new CommentController();
