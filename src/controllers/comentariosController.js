const Comentario = require("../models/Comentario");

exports.index = async (req, res) => {
  const comentarios = await Comentario.findAll({
    order: [["created_at", "DESC"]]
  });

  res.renderWithLayout("site/comentarios", {
    layout: "layouts/main",
    titulo: "Comentários",
    comentarios,
    enviado: req.query.enviado
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

  // 🔥 AVISO PARA O USUÁRIO
  res.redirect("/comentarios?enviado=1");
};
