module.exports = (sequelize, DataTypes) => {
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

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Post, {
      foreignKey: "post_id",
      onDelete: "CASCADE"
    });
  };

  return Comentario;
};
