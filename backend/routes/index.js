import express from 'express';
import { getUsers, Register, Login } from '../users/users-controller.js';
import { verifyToken } from '../middleware/verifiy-token.js';
import { refreshToken } from '../users/refresh-token.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;