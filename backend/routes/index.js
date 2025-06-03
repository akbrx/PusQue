import express from 'express';
import multer from 'multer';
import { getUsers, Register, Login, Logout } from '../users/users-controller.js';
import { verifyToken } from '../middleware/verifiy-token.js';
import { refreshToken } from '../users/refresh-token.js';
import { createAntrian, accAntrian, tolakAntrian, selesaiAntrian, getAllAntrian } from '../antrian/antrian-controller.js';
import { getAntrianById } from '../antrian/antrian-controller.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/ktp/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, req.body.nik + '.' + ext);
  }
});
const upload = multer({ storage: storage });

// User routes
router.get('/users', verifyToken, getUsers);
router.post('/users', upload.single('fotoKtp'), Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Antrian routes
router.get('/antrian', verifyToken, getAllAntrian);
router.post('/antrian', verifyToken, createAntrian);
router.patch('/antrian/:id/acc', verifyToken, accAntrian);
router.patch('/antrian/:id/tolak', verifyToken, tolakAntrian);
router.patch('/antrian/:id/selesai', verifyToken, selesaiAntrian);

router.get('/antrian/:id', verifyToken, getAntrianById);

export default router;