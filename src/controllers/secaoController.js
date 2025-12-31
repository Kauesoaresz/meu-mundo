const Secao = require("../models/Secao");
const Post = require("../models/Post");

/* ===============================
   LISTAR POSTS DA SEÇÃO (GRID)
   URL: /:slug
=============================== */
exports.mostrar = async (req, res) => {
  try {
    const { slug } = req.params;

    // Busca a seção ativa pelo slug
    const secao = await Secao.findOne({
      where: {
        slug,
        ativa: true
      }
    });

    if (!secao) {
      return res.status(404).send("Seção não encontrada");
    }

    // Busca os posts da seção
    const posts = await Post.findAll({
      where: {
        secao_id: secao.id
      },
      order: [["criado_em", "DESC"]]
    });

    res.renderWithLayout("secao/index", {
      layout: "layouts/main",
      titulo: `${secao.nome} — Meu Mundo`,
      secao,
      posts
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar a seção");
  }
};

/* ===============================
   MOSTRAR POST COMPLETO
   URL: /:slug/post/:id
=============================== */
exports.mostrarPost = async (req, res) => {
  try {
    const { slug, id } = req.params;

    // Busca a seção ativa
    const secao = await Secao.findOne({
      where: {
        slug,
        ativa: true
      }
    });

    if (!secao) {
      return res.status(404).send("Seção não encontrada");
    }

    // Busca o post dentro da seção
    const post = await Post.findOne({
      where: {
        id,
        secao_id: secao.id
      }
    });

    if (!post) {
      return res.status(404).send("Post não encontrado");
    }

    res.renderWithLayout("secao/post", {
      layout: "layouts/main",
      titulo: post.titulo,
      secao,
      post
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar o post");
  }
};
