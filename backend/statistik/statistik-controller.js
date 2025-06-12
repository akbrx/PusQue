import { Op } from "sequelize";
import Users from "../users/user-model.js"; // Pastikan model Users sudah benar

export const getPasienPerBulan = async (req, res) => {
  try {
    // Ambil tahun dari query, default tahun sekarang
    const tahun = req.query.tahun || new Date().getFullYear();

    // Buat array bulan
    const bulanArr = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Query jumlah user per bulan
    const result = await Promise.all(
      bulanArr.map(async (namaBulan, idx) => {
        const bulan = idx + 1;
        const jumlah = await Users.count({
          where: {
            createdAt: {
              [Op.gte]: new Date(`${tahun}-${bulan.toString().padStart(2, "0")}-01`),
              [Op.lt]: new Date(`${tahun}-${(bulan + 1).toString().padStart(2, "0")}-01`)
            }
          }
        });
        return { bulan: namaBulan, jumlah };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};