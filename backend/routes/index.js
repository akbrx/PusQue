import express from 'express';
import { getUsers, Register } from '../controllers/users.js';

const router = express.Router();

router.get('/users', getUsers);      // Untuk GET semua user
router.post('/users', Register);     // Untuk register user baru

export default router;