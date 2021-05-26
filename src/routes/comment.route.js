import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

import {
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller';

router.post('/articles', auth, createArticle);

export default router;
