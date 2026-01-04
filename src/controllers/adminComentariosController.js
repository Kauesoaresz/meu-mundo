const Comentario = require("../models/Comentario");

exports.index = async (req, res) => {
  const comentarios = await Comentario.findAll({
    order: [["created_at", "DESC"]]
  });

  res.renderWithLayout("admin/comentarios/index", {
    layout: "layouts/admin",
    titulo: "Comentários",
    comentarios
  });
};

exports.aprovar = async (req, res) => {
  await Comentario.update(
    { aprovado: true },
    { where: { id: req.params.id } }
  );

  res.redirect("/admin/comentarios");
};

exports.reprovar = async (req, res) => {
  await Comentario.update(
    { aprovado: false },
    { where: { id: req.params.id } }
  );

  res.redirect("/admin/comentarios");
};

exports.excluir = async (req, res) => {
  await Comentario.destroy({
    where: { id: req.params.id }
  });

  res.redirect("/admin/comentarios");
};
