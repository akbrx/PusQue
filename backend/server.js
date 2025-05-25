//hilangkan semua komentar (di on kan) untuk create database

import express from 'express';
import db from './config/database.js';
//import Users from './models/user-model.js';
import router from './routes/index.js';

const app = express();

try {
  await db.authenticate();
  console.log('Database connected');
  //await db.sync();
  //await Users.sync();
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(router)

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});