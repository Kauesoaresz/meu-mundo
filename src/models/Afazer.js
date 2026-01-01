const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Afazer = sequelize.define(
  "Afazer",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM(
        "nao_iniciado",
        "em_obra",
        "concluido"
      ),
      allowNull: false,
      defaultValue: "nao_iniciado"
    },

    prioridade: {
      type: DataTypes.ENUM(
        "baixa",
        "media",
        "alta"
      ),
      allowNull: false,
      defaultValue: "media"
    },

    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    concluido_em: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "afazeres",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);

module.exports = Afazer;
