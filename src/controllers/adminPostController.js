const Post = require("../models/Post");
const Secao = require("../models/Secao");

/* ===============================
   HELPERS
=============================== */
function extrairYoutubeId(valor) {
  if (!valor) return null;

  // Se já for um ID (11 caracteres)
  if (valor.length === 11 && !valor.includes("http")) {
    return valor;
  }

  // Tenta extrair do link padrão
  const match = valor.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

/* ===============================
   LISTAR POSTS
=============================== */
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

/* ===============================
   FORM NOVO POST
=============================== */
exports.createForm = async (req, res) => {
  const secoes = await Secao.findAll({
    where: { ativa: true },
    order: [["ordem", "ASC"]]
  });

  res.renderWithLayout("admin/posts/form", {
    layout: "layouts/admin",
    titulo: "Novo Post",
    post: null,
    secoes
  });
};

/* ===============================
   CRIAR POST
=============================== */
exports.store = async (req, res) => {
  const {
    titulo,
    descricao,
    conteudo,
    secao_id,
    video_youtube,
    coord_x,
    coord_y,
    coord_z,
    dimensao
  } = req.body;

  const videoId = extrairYoutubeId(video_youtube);

  await Post.create({
    titulo,
    descricao,
    conteudo,
    secao_id,
    video_youtube: videoId,

    // 🔹 COORDENADAS (opcional)
    coord_x: coord_x || null,
    coord_y: coord_y || null,
    coord_z: coord_z || null,
    dimensao: dimensao || null,

    criado_em: new Date()
  });

  res.redirect("/admin/posts");
};

/* ===============================
   VER POST
=============================== */
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

/* ===============================
   FORM EDITAR POST
=============================== */
exports.editForm = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  const secoes = await Secao.findAll({
    where: { ativa: true },
    order: [["ordem", "ASC"]]
  });

  if (!post) return res.send("Post não encontrado");

  res.renderWithLayout("admin/posts/form", {
    layout: "layouts/admin",
    titulo: "Editar Post",
    post,
    secoes
  });
};

/* ===============================
   ATUALIZAR POST
=============================== */
exports.update = async (req, res) => {
  const {
    titulo,
    descricao,
    conteudo,
    secao_id,
    video_youtube,
    coord_x,
    coord_y,
    coord_z,
    dimensao
  } = req.body;

  const videoId = extrairYoutubeId(video_youtube);

  await Post.update(
    {
      titulo,
      descricao,
      conteudo,
      secao_id,
      video_youtube: videoId,

      // 🔹 COORDENADAS
      coord_x: coord_x || null,
      coord_y: coord_y || null,
      coord_z: coord_z || null,
      dimensao: dimensao || null
    },
    { where: { id: req.params.id } }
  );

  res.redirect("/admin/posts");
};

/* ===============================
   EXCLUIR POST
=============================== */
exports.destroy = async (req, res) => {
  await Post.destroy({
    where: { id: req.params.id }
  });

  res.redirect("/admin/posts");
};
