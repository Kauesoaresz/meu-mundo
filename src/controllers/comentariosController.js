const Comentario = require("../models/Comentario");

exports.index = async (req, res) => {
  const comentarios = await Comentario.findAll({
    where: { aprovado: true },
    order: [["created_at", "DESC"]]
  });

  res.renderWithLayout("site/comentarios", {
    layout: "layouts/main",
    titulo: "Comentários",
    comentarios
  });
};

exports.store = async (req, res) => {
  const { nome, comentario } = req.body;

  if (!nome || !comentario) {
    return res.redirect("/comentarios");
  }

  await Comentario.create({
    nome,
    comentario
  });

  res.redirect("/comentarios");
};
