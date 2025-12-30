const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Secao = require("./Secao");

const Post = sequelize.define("Post", {
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
  criado_em: {
    type: DataTypes.DATE
  }
}, {
  tableName: "posts"
});

Post.belongsTo(Secao, {
  foreignKey: "secao_id"
});

module.exports = Post;
