const express = require("express");
const router = express.Router();
const { Comentario, Post } = require("../models");

router.get("/admin/comentarios", async (req, res) => {
  const comentarios = await Comentario.findAll({
    include: Post,
    order: [["created_at", "DESC"]]
  });

  res.render("admin/comentarios", { comentarios });
});

router.post("/admin/comentarios/:id/aprovar", async (req, res) => {
  await Comentario.update(
    { aprovado: true },
    { where: { id: req.params.id } }
  );
  res.redirect("/admin/comentarios");
});

router.post("/admin/comentarios/:id/excluir", async (req, res) => {
  await Comentario.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/comentarios");
});

module.exports = router;
