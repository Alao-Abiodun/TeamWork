import express from 'express';

import auth from '../middleware/auth';

import gifCtrl from '../controllers/gif.controller';

const router = express.Router();

router.post('/gifs', auth, gifCtrl.createImage);
router.delete('/gifs/:gifId', auth, gifCtrl.deleteGif);
router.post('/gifs/:gifId/comment', gifCtrl.addGifComment);

export default router;
