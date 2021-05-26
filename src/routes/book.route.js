import express from 'express';
import { createNewBook } from '../controllers/book.controller';

import { auth, checkIfUser } from '../middleware/auth';

const router = express.Router();

router.post('/book', auth, checkIfUser, createNewBook);

export default router;
