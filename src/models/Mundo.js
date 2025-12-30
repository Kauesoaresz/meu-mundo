const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mundo = sequelize.define("Mundo", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  versao_minecraft: {
    type: DataTypes.STRING
  },
  criado_em: {
    type: DataTypes.DATE
  }
}, {
  tableName: "mundo"
});

module.exports = Mundo;
