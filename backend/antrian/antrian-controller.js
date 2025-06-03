import Antrian from "./antrian-model.js";
import Users from "../users/user-model.js";

export const createAntrian = async (req, res) => {
  try {
    const { keluhan, poli } = req.body;
    const userId = req.userId; // diasumsikan sudah di-set oleh middleware auth/JWT

    if (!keluhan || !poli) {
      return res.status(400).json({ message: "Keluhan dan poli wajib diisi" });
    }

    // Pastikan user ada
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Buat antrian baru, status otomatis 'menunggu acc admin'
    const antrian = await Antrian.create({
      keluhan,
      poli,
      userId
    });

    res.status(201).json({ message: "Antrian berhasil dibuat", antrian });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin ACC antrian
export const accAntrian = async (req, res) => {
  // Pastikan req.userRole === 'admin'
  const { id } = req.params;
  const antrian = await Antrian.findByPk(id);
  if (!antrian) return res.status(404).json({ message: "Antrian tidak ditemukan" });
  if (antrian.status !== 'menunggu acc admin') return res.status(400).json({ message: "Antrian sudah diproses" });
  antrian.status = 'dalam antrian';
  await antrian.save();
  res.json({ message: "Antrian di-ACC, masuk dalam antrian", antrian });
};

// Admin tolak antrian
export const tolakAntrian = async (req, res) => {
  // Pastikan req.userRole === 'admin'
  const { id } = req.params;
  const antrian = await Antrian.findByPk(id);
  if (!antrian) return res.status(404).json({ message: "Antrian tidak ditemukan" });
  if (antrian.status !== 'menunggu acc admin') return res.status(400).json({ message: "Antrian sudah diproses" });
  antrian.status = 'ditolak';
  await antrian.save();
  res.json({ message: "Antrian ditolak", antrian });
};

// Dokter update status antrian ke selesai
export const selesaiAntrian = async (req, res) => {
  // Pastikan req.userRole === 'dokter'
  const { id } = req.params;
  const antrian = await Antrian.findByPk(id);
  if (!antrian) return res.status(404).json({ message: "Antrian tidak ditemukan" });
  if (antrian.status !== 'dalam antrian') return res.status(400).json({ message: "Antrian belum di-ACC admin atau sudah selesai/ditolak" });
  antrian.status = 'selesai';
  await antrian.save();
  res.json({ message: "Antrian selesai", antrian });
};

