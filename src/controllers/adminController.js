const Mundo = require("../models/Mundo");
const Post = require("../models/Post");
const Secao = require("../models/Secao");

// ===============================
// DASHBOARD ADMIN
// ===============================
exports.dashboard = async (req, res) => {
  let mundo = await Mundo.findOne();

  // Garante que sempre exista um mundo
  if (!mundo) {
    mundo = await Mundo.create({
      nome: "Meu Mundo",
      criado_em: new Date()
    });
  }

  const totalPosts = await Post.count();
  const totalSecoes = await Secao.count();

  const ultimoPost = await Post.findOne({
    order: [["id", "DESC"]]
  });

  res.renderWithLayout("admin/index", {
    layout: "layouts/admin",
    titulo: "Painel Admin",
    mundo,
    totalPosts,
    totalSecoes,
    ultimoPost
  });
};

// ===============================
// TELA ADMIN - MUNDO
// ===============================
exports.index = async (req, res) => {
  let mundo = await Mundo.findOne();

  if (!mundo) {
    mundo = await Mundo.create({
      nome: "Meu Mundo",
      criado_em: new Date()
    });
  }

  res.renderWithLayout("admin/mundo", {
    layout: "layouts/admin",
    titulo: "Configurações do Mundo",
    mundo
  });
};

// ===============================
// ATUALIZAR STATUS DO MUNDO
// ===============================
exports.update = async (req, res) => {
  const mundo = await Mundo.findOne();
  if (!mundo) return res.redirect("/admin");

  const {
    nome,
    descricao,
    versao_minecraft,
    edicao,
    modo,
    dificuldade,
    criado_em,
    objetivo_atual,
    seed,
    ultima_jogatina,
    dia_mundo
  } = req.body;

  await mundo.update({
    nome,
    descricao,
    versao_minecraft,
    edicao,
    modo,
    dificuldade,
    criado_em,
    objetivo_atual,
    seed,

    // 🔥 NOVOS CAMPOS (AGORA CORRETOS)
    ultima_jogatina: ultima_jogatina || null,
    dia_mundo: dia_mundo || null,

    // CHECKBOXES (SEGURO)
    overworld: req.body.overworld === "on",
    nether: req.body.nether === "on",
    end: req.body.end === "on"
  });

  res.redirect("/admin/mundo");
};

// ===============================
// ATUALIZAR HERO
// ===============================
exports.atualizarHero = async (req, res) => {
  const mundo = await Mundo.findOne();
  if (!mundo || !req.file) {
    return res.redirect("/admin/mundo");
  }

  await mundo.update({
    hero_imagem: `/img/hero/uploads/${req.file.filename}`
  });

  res.redirect("/admin/mundo");
};
