import express from 'express';
import multer from 'multer';
import { getUsers, Register, Login, Logout } from '../users/users-controller.js';
import { verifyToken } from '../middleware/verifiy-token.js';
import { refreshToken } from '../users/refresh-token.js';

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

router.get('/users', verifyToken, getUsers);
router.post('/users', upload.single('fotoKtp'), Register); // <-- pakai upload.single
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;