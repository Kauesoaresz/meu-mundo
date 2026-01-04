const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mundo = sequelize.define("Mundo", {
  nome: DataTypes.STRING,
  descricao: DataTypes.TEXT,

  // 👇 NOVOS CAMPOS
  ultima_jogatina: {
    type: DataTypes.DATE,
    allowNull: true
  },

  dia_mundo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
    // =====================
    // VERSÃO / JOGO
    // =====================
    versao_minecraft: {
      type: DataTypes.STRING
    },

    edicao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Java Edition"
    },

    modo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Survival (Vanilla)"
    },

    dificuldade: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Difícil"
    },

    // =====================
    // TEMPO DO MUNDO
    // =====================
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false
    },

    // =====================
    // DIMENSÕES
    // =====================
    overworld: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    nether: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    end: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    // =====================
    // STATUS ATUAL
    // =====================
    objetivo_atual: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    seed: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // =====================
    // HERO
    // =====================
    hero_imagem: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "mundo",
    timestamps: false
  }
);

module.exports = Mundo;
