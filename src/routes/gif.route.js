import express from 'express';

import { auth } from '../middleware/auth';

import {
  createImage,
  deleteGif,
  addGifComment,
  getSingleGif,
} from '../controllers/gif.controller';

const router = express.Router();

router.post('/gifs', auth, createImage);
router.delete('/gifs/:gifId', auth, deleteGif);
router.post('/gifs/:gifId/comment', auth, addGifComment);
router.get('/gifs/:gifId', auth, getSingleGif);

export default router;
