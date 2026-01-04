require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,   // ex: meu_mundo
  process.env.DB_USER,       // ex: root ou railway
  process.env.DB_PASSWORD,   // senha do Railway
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    timezone: "-03:00",
    define: {
      timestamps: false,
      underscored: true
    }
  }
);

module.exports = sequelize;
