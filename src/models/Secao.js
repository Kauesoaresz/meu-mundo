const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Secao = sequelize.define("Secao", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  icone: {
    type: DataTypes.STRING
  },
  ativa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  ordem: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: "secoes"
});

module.exports = Secao;
