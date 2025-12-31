const Mundo = require("../models/Mundo");

// ===============================
// TELA ADMIN - MUNDO
// ===============================
exports.index = async (req, res) => {
  let mundo = await Mundo.findOne();

  // Garante que sempre exista um mundo
  if (!mundo) {
    mundo = await Mundo.create({
      nome: "Meu Mundo",
      criado_em: new Date()
    });
  }

  res.renderWithLayout("admin/mundo", {
    layout: "layouts/admin",
    titulo: "Admin - Mundo",
    mundo
  });
};

// ===============================
// ATUALIZAR STATUS DO MUNDO
// ===============================
exports.update = async (req, res) => {
  const mundo = await Mundo.findOne();
  if (!mundo) return res.redirect("/admin");

  await mundo.update({
    nome: req.body.nome,
    descricao: req.body.descricao,
    versao_minecraft: req.body.versao_minecraft,

    edicao: req.body.edicao,
    modo: req.body.modo,
    dificuldade: req.body.dificuldade,

    criado_em: req.body.criado_em,

    objetivo_atual: req.body.objetivo_atual,
    seed: req.body.seed,

    overworld: req.body.overworld === "on",
    nether: req.body.nether === "on",
    end: req.body.end === "on"
  });

  res.redirect("/admin");
};

// ===============================
// ATUALIZAR HERO
// ===============================
exports.atualizarHero = async (req, res) => {
  const mundo = await Mundo.findOne();
  if (!mundo || !req.file) {
    return res.redirect("/admin");
  }

  await mundo.update({
    hero_imagem: `/img/hero/uploads/${req.file.filename}`
  });

  res.redirect("/admin");
};
