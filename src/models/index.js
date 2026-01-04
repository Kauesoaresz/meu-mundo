const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// IMPORTA E EXECUTA TODOS OS MODELS
require("./Post")(sequelize, Sequelize.DataTypes);
require("./Secao")(sequelize, Sequelize.DataTypes);
require("./PostImagem")(sequelize, Sequelize.DataTypes);
require("./Comentario")(sequelize, Sequelize.DataTypes);
require("./Afazer")(sequelize, Sequelize.DataTypes);
require("./Mundo")(sequelize, Sequelize.DataTypes);
require("./Usuario")(sequelize, Sequelize.DataTypes);

// EXECUTA ASSOCIATIONS
Object.values(sequelize.models).forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = sequelize.models;
