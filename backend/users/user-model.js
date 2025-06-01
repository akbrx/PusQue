import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nik: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    tanggalLahir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    domisili: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('pasien', 'admin', 'dokter'),
        allowNull: false,
        defaultValue: 'pasien'
    }
}, {
    freezeTableName: true,
});

export default User;