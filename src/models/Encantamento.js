const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Encantamento = sequelize.define(
  "Encantamento",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    categoria: {
      type: DataTypes.ENUM(
        "Armadura", 
        "Ferramentas", 
        "Armas"
      ),
      allowNull: false
    },

    nivel_maximo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1 // Ex: 5 para Afiação V, 1 para Remendo
    },

    conquistado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    prioridade: {
      type: DataTypes.ENUM(
        "baixa",
        "media",
        "alta"
      ),
      allowNull: false,
      defaultValue: "media"
    }
  },
  {
    tableName: "encantamentos",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);

module.exports = Encantamento;