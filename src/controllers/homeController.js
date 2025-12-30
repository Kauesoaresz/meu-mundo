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

  res.renderWithLayout("home", {
    layout: "layouts/main",
    titulo: "Meu Mundo",
    mundo,
    postsRecentes,
    ultimaAtualizacao: ultimoPost ? ultimoPost.criado_em : null
  });
};
