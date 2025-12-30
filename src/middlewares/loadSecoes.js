const Secao = require("../models/Secao");

module.exports = async (req, res, next) => {
  try {
    const secoes = await Secao.findAll({
      where: { ativa: true },
      order: [["ordem", "ASC"]]
    });

    // disponível em TODAS as views
    res.locals.secoes = secoes;
    next();
  } catch (err) {
    next(err);
  }
};
