import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

import articleCtrl from '../controllers/article.controller';

router.post('/articles', auth, articleCtrl.createArticle);
router.patch('/articles/:articleId', auth, articleCtrl.updateArticle);
router.delete('/articles/:articleId', auth, articleCtrl.deleteArticle);
router.post(
  '/articles/:articleId/comment',
  auth,
  articleCtrl.addArticleComment
);
router.get('/feed', auth, articleCtrl.getFeeds);
router.get('/articles/:articleId', auth, articleCtrl.getSingleArticle);

export default router;
