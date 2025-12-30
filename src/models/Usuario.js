const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
  nome: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  senha: {
    type: DataTypes.STRING
  },
  criado_em: {
    type: DataTypes.DATE
  }
}, {
  tableName: "usuarios",
  timestamps: false
});

module.exports = Usuario;
