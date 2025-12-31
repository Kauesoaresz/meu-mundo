const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Secao = require("./Secao");

const Post = sequelize.define(
  "Post",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descricao: {
      type: DataTypes.TEXT
    },

    conteudo: {
      type: DataTypes.TEXT("long")
    },

    imagem: {
      type: DataTypes.STRING
    },

    video_youtube: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // 🔥 COORDENADAS
    coord_x: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    coord_y: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    coord_z: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    dimensao: {
      type: DataTypes.ENUM("overworld", "nether", "end"),
      allowNull: true
    },

    criado_em: {
      type: DataTypes.DATE
    },

    secao_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "posts"
  }
);

Post.belongsTo(Secao, {
  foreignKey: "secao_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = Post;
