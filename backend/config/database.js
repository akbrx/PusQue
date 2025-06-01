import {Sequelize} from 'sequelize';

const db = new Sequelize('pusque', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;