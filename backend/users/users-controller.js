import Users from './user-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email'],
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const Register = async (req, res) => {
    const { name, nik, tanggalLahir, domisili, role, password, confPassword } = req.body;

    // Validasi field wajib
    if (!name || !nik || !tanggalLahir || !domisili || !role || !password || !confPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validasi password dan konfirmasi
    if (password !== confPassword) {
        return res.status(400).json({ message: 'Password dan konfirmasi password tidak sama' });
    }

    try {
        // Cek NIK sudah terdaftar
        const existingUser = await Users.findOne({ where: { nik } });
        if (existingUser) {
            return res.status(400).json({ message: 'NIK already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name,
            nik,
            tanggalLahir,
            domisili,
            role,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                nik: req.body.nik
            }
        });
        // Cek jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({ message: 'NIK tidak ditemukan' });
        }
        // Cek password
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ message: 'Password salah' });
        const userId = user.id;
        const name = user.name;
        const nik = user.nik;
        const accsessToken = jwt.sign({ userId, name, nik }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, nik }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        // Update field refreshToken
        await Users.update({ refreshToken: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accsessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refreshToken: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refreshToken: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    res.sendStatus(200);
}