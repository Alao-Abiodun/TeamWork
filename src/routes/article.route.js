import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

import {
  createArticle,
  updateArticle,
  deleteArticle,
  addArticleComment,
  getFeeds,
  getSingleArticle,
} from '../controllers/article.controller';

router.post('/articles', auth, createArticle);
router.patch('/articles/:articleId', auth, updateArticle);
router.delete('/articles/:articleId', auth, deleteArticle);
router.post('/articles/:articleId/comment', auth, addArticleComment);
router.get('/feed', auth, getFeeds);
router.get('/articles/:articleId', auth, getSingleArticle);

export default router;
