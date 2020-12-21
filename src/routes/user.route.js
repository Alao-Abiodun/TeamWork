import express from 'express';

const router = express.Router();

import userCtrl from '../controllers/user.controller';

router.post('/auth/create-user', userCtrl.signUp);
router.post('/auth/signin', userCtrl.Login);

export default router;
