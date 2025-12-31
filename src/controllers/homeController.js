const Mundo = require("../models/Mundo");
const Secao = require("../models/Secao");
const Post = require("../models/Post");

exports.index = async (req, res) => {
  const mundo = await Mundo.findOne();

  const postsRecentes = await Post.findAll({
    include: Secao,
    order: [["criado_em", "DESC"]],
    limit: 6
  });

  const ultimoPost = postsRecentes[0] || null;

  // =========================
  // HERO DINÂMICO (com fallback)
  // =========================
  const heroImagem = mundo?.hero_imagem
    ? mundo.hero_imagem
    : "/img/hero/default.jpg";

  // =========================
  // IDADE DO MUNDO (automática)
  // =========================
  let idadeDias = null;

  if (mundo && mundo.criado_em) {
    const hoje = new Date();
    const criado = new Date(mundo.criado_em);
    idadeDias = Math.floor(
      (hoje - criado) / (1000 * 60 * 60 * 24)
    );
  }

  // =========================
  // RENDER
  // =========================
  res.renderWithLayout("home", {
    layout: "layouts/main",
    titulo: "Meu Mundo",
    mundo,
    heroImagem,
    idadeDias,
    postsRecentes,
    ultimaAtualizacao: ultimoPost ? ultimoPost.criado_em : null
  });
};
