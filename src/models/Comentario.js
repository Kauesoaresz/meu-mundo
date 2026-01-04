const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comentario = sequelize.define("Comentario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  aprovado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "comentarios",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

module.exports = Comentario;
