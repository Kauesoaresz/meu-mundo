const Post = require("../models/Post");
const Secao = require("../models/Secao");

// LISTAR POSTS
exports.index = async (req, res) => {
  const posts = await Post.findAll({
    include: Secao,
    order: [["criado_em", "DESC"]]
  });

  res.renderWithLayout("admin/posts/index", {
    layout: "layouts/admin",
    titulo: "Gerenciar Posts",
    posts
  });
};

// FORM NOVO POST
exports.createForm = async (req, res) => {
  const secoes = await Secao.findAll({ where: { ativa: true } });

  res.renderWithLayout("admin/posts/form", {
    layout: "layouts/admin",
    titulo: "Novo Post",
    post: null,
    secoes
  });
};

// CRIAR POST
exports.store = async (req, res) => {
  const { titulo, descricao, conteudo, secao_id } = req.body;

  await Post.create({
    titulo,
    descricao,
    conteudo,
    secao_id
  });

  res.redirect("/admin/posts");
};

// VER POST
exports.show = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: Secao
  });

  if (!post) return res.send("Post não encontrado");

  res.renderWithLayout("admin/posts/show", {
    layout: "layouts/admin",
    titulo: post.titulo,
    post
  });
};

// FORM EDITAR POST
exports.editForm = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  const secoes = await Secao.findAll({ where: { ativa: true } });

  if (!post) return res.send("Post não encontrado");

  res.renderWithLayout("admin/posts/form", {
    layout: "layouts/admin",
    titulo: "Editar Post",
    post,
    secoes
  });
};

// ATUALIZAR POST
exports.update = async (req, res) => {
  const { titulo, descricao, conteudo, secao_id } = req.body;

  await Post.update(
    { titulo, descricao, conteudo, secao_id },
    { where: { id: req.params.id } }
  );

  res.redirect("/admin/posts");
};

// EXCLUIR POST
exports.destroy = async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/posts");
};
