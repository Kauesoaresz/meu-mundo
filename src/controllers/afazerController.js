const Afazer = require("../models/Afazer");

exports.index = async (req, res) => {
  try {
    const afazeres = await Afazer.findAll({
      order: [
        ["status", "ASC"],
        ["ordem", "ASC"],
        ["criado_em", "ASC"]
      ]
    });

    const total = afazeres.length;
    const concluidos = afazeres.filter(a => a.status === "concluido").length;

    res.renderWithLayout("afazeres/index", {
  titulo: "Afazeres do Mundo",
  afazeres,
  total,
  concluidos,
  layout: "layouts/main"
});

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar afazeres");
  }
};
