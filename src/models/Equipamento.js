const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Equipamento = sequelize.define(
  "Equipamento",
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
    imagem: {
      type: DataTypes.STRING,
      allowNull: true // Caminho da imagem que você vai fazer upload (ex: /img/uploads/picareta.png)
    },
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // Para podermos ordenar: Capacete (1), Peitoral (2), etc.
    }
  },
  {
    tableName: "equipamentos",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);

module.exports = Equipamento;