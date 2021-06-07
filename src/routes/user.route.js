import express from 'express';

const router = express.Router();

import { signUp, Login } from '../controllers/user.controller';
import { auth, checkIfUser } from '../middleware/auth';

router.post('/auth/create-user', auth, checkIfUser, signUp);
router.post('/auth/signin', auth, Login);

export default router;
