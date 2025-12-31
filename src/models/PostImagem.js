const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./Post");

const PostImagem = sequelize.define(
  "PostImagem",
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    imagem: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "post_imagens",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

// 🔥 ALIAS DEFINIDO AQUI
PostImagem.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});

Post.hasMany(PostImagem, {
  foreignKey: "post_id",
  as: "imagens" // <<< ISSO RESOLVE TUDO
});

module.exports = PostImagem;
